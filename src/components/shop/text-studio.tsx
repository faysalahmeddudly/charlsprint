"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  CaseSensitive,
  CheckIcon,
  Italic,
  Pipette,
  TypeIcon,
  Underline,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"
import { type TextStyle, TEXT_FONTS, INK_TONES, isLightColor } from "./product-customizer.constants"

const MM_PER_PX = 350 / 320

function fontScaleLabel(pt: number) {
  if (pt <= 20) return "Small"
  if (pt <= 35) return "Medium"
  if (pt <= 60) return "Large"
  return "XL"
}

const CANVAS_WIDTH = 320
const CANVAS_HEIGHT = 380

function drawArcLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  arcDegrees: number,
  letterSpacingPx: number,
  color: string,
  outline: boolean,
  outlineWidth: number
) {
  const totalAngle = (arcDegrees * Math.PI) / 180
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width + letterSpacingPx)
  const totalWidth = widths.reduce((a, b) => a + b, 0)
  const angleStep = totalWidth > 0 ? totalAngle / widths.length : 0
  const angle = -totalAngle / 2

  chars.forEach((ch, i) => {
    const charAngle = angle + angleStep * (i + 0.5)
    const x = centerX + radius * Math.sin(charAngle)
    const y = centerY - radius * Math.cos(charAngle)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(charAngle)
    if (outline) {
      ctx.lineWidth = outlineWidth
      ctx.strokeStyle = color
      ctx.strokeText(ch, 0, 0)
    }
    ctx.fillStyle = color
    ctx.fillText(ch, 0, 0)
    ctx.restore()
  })

  return totalWidth
}

function drawFlatLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  letterSpacingPx: number,
  color: string,
  align: TextStyle["align"],
  outline: boolean,
  outlineWidth: number
) {
  const chars = [...text]
  const widths = chars.map((ch) => ctx.measureText(ch).width + letterSpacingPx)
  const totalWidth = widths.reduce((a, b) => a + b, 0)

  let startX = x
  if (align === "center") startX = x - totalWidth / 2
  if (align === "right" || align === "justify") startX = x - totalWidth

  let cursor = startX
  chars.forEach((ch, i) => {
    if (outline) {
      ctx.lineWidth = outlineWidth
      ctx.strokeStyle = color
      ctx.strokeText(ch, cursor, y)
    }
    ctx.fillStyle = color
    ctx.fillText(ch, cursor, y)
    cursor += widths[i]
  })

  return totalWidth
}

export function TextStudio({ value, onChange }: { value: TextStyle; onChange: (style: TextStyle) => void }) {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [customHexOpen, setCustomHexOpen] = useState(false)

  useEffect(() => {
    const canvasEl = canvasElRef.current
    const ctx = canvasEl?.getContext("2d")
    if (!canvasEl || !ctx) return

    canvasEl.width = CANVAS_WIDTH
    canvasEl.height = CANVAS_HEIGHT
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const font = TEXT_FONTS.find((f) => f.id === value.fontId) ?? TEXT_FONTS[0]
    const weight = value.bold ? "700" : "400"
    const style = value.italic ? "italic" : "normal"
    ctx.font = `${style} ${weight} ${value.fontScale}px ${font.family}`
    ctx.textBaseline = "middle"

    const letterSpacingPx = value.letterSpacing * 4
    const displayText = value.uppercase ? value.value.toUpperCase() : value.value
    const lines = displayText.split("\n").filter((line) => line.length > 0)
    const lineHeight = value.fontScale * 1.15
    const centerX = CANVAS_WIDTH / 2
    const centerY = CANVAS_HEIGHT / 2 - 20

    let maxWidth = 0

    if (value.curvature > 0) {
      const radius = 420 - value.curvature * 2.2
      const arcDegrees = value.curvature * 0.9
      const joined = lines.join(" ")
      ctx.textAlign = "center"
      maxWidth = drawArcLine(
        ctx,
        joined,
        centerX,
        centerY - radius + lineHeight,
        radius,
        arcDegrees,
        letterSpacingPx,
        value.color,
        value.outline,
        value.outlineWidth
      )
    } else {
      const startY = centerY - ((lines.length - 1) * lineHeight) / 2
      lines.forEach((line, i) => {
        const width = drawFlatLine(
          ctx,
          line,
          centerX,
          startY + i * lineHeight,
          letterSpacingPx,
          value.color,
          value.align,
          value.outline,
          value.outlineWidth
        )
        maxWidth = Math.max(maxWidth, width)
      })
    }

    if (value.underline && value.curvature === 0) {
      const underlineY = centerY - ((lines.length - 1) * lineHeight) / 2 + (lines.length - 1) * lineHeight + value.fontScale * 0.35
      ctx.strokeStyle = value.color
      ctx.lineWidth = Math.max(1, value.fontScale / 20)
      ctx.beginPath()
      ctx.moveTo(centerX - maxWidth / 2, underlineY)
      ctx.lineTo(centerX + maxWidth / 2, underlineY)
      ctx.stroke()
    }

    ctx.font = `600 12px ${font.family}`
    ctx.fillStyle = "rgba(255,255,255,0.85)"
    ctx.textAlign = "center"
    let subCursor = centerX - ctx.measureText(value.subtitle).width / 2
    ;[...value.subtitle].forEach((ch) => {
      ctx.fillText(ch, subCursor + ctx.measureText(ch).width / 2, centerY + 90)
      subCursor += ctx.measureText(ch).width + 1.5
    })

    setDimensions({
      width: Math.round(maxWidth * MM_PER_PX),
      height: Math.round(lines.length * lineHeight * MM_PER_PX),
    })
  }, [value])

  function set<K extends keyof TextStyle>(key: K, val: TextStyle[K]) {
    onChange({ ...value, [key]: val })
  }

  const alignOptions: { id: TextStyle["align"]; icon: LucideIcon }[] = [
    { id: "left", icon: AlignLeft },
    { id: "center", icon: AlignCenter },
    { id: "right", icon: AlignRight },
    { id: "justify", icon: AlignJustify },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              1. TYPOGRAPHY ENGINE (POPULAR APPAREL FONTS)
            </p>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              100+ Free Commercial Fonts
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {TEXT_FONTS.map((font) => {
              const active = font.id === value.fontId
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => set("fontId", font.id)}
                  className={cn(
                    "relative rounded-lg border p-3 text-left transition-colors",
                    active ? "border-destructive bg-destructive/5" : "border-border hover:bg-muted"
                  )}
                >
                  {active && (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-destructive text-white">
                      <CheckIcon className="size-3" />
                    </span>
                  )}
                  <p className="text-lg font-bold" style={{ fontFamily: font.cssVar }}>
                    {font.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{font.sublabel}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border p-4">
          <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
            2. DIMENSIONS &amp; LETTERING LAYOUT
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Font Scale:</span>
                <span className="font-mono font-medium">
                  {value.fontScale} pt ({fontScaleLabel(value.fontScale)})
                </span>
              </div>
              <input
                type="range"
                min={12}
                max={96}
                value={value.fontScale}
                onChange={(e) => set("fontScale", Number(e.target.value))}
                className="w-full accent-destructive"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Letter Spacing:</span>
                <span className="font-mono font-medium">
                  {value.letterSpacing > 0 ? "+" : ""}
                  {value.letterSpacing} mm
                </span>
              </div>
              <input
                type="range"
                min={-5}
                max={15}
                step={0.5}
                value={value.letterSpacing}
                onChange={(e) => set("letterSpacing", Number(e.target.value))}
                className="w-full accent-destructive"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 rounded-lg border border-border p-1">
              {alignOptions.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => set("align", id)}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md transition-colors",
                    value.align === id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="size-3.5" />
                </button>
              ))}
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-1">
              <button
                type="button"
                onClick={() => set("bold", !value.bold)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.bold ? "bg-destructive text-white" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Bold className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set("italic", !value.italic)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.italic ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Italic className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set("uppercase", !value.uppercase)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.uppercase ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <CaseSensitive className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => set("underline", !value.underline)}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md transition-colors",
                  value.underline ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Underline className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              3. APPAREL CURVATURE &amp; SPECIAL EFFECTS
            </p>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              Screenprint Ready
            </span>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Collar Arch / Arc:</span>
              <span className="font-mono font-medium">
                {value.curvature}% ({value.curvature === 0 ? "Flat" : "Curved"})
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={value.curvature}
              onChange={(e) => set("curvature", Number(e.target.value))}
              className="w-full accent-destructive"
            />
          </div>
          <label className="mt-3 flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value.outline}
                onChange={(e) => set("outline", e.target.checked)}
                className="size-4 accent-destructive"
              />
              Outline Stroke
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
              <input
                type="number"
                min={0.5}
                max={6}
                step={0.5}
                disabled={!value.outline}
                value={value.outlineWidth}
                onChange={(e) => set("outlineWidth", Number(e.target.value))}
                className="h-6 w-14 rounded border border-input bg-transparent px-1 text-right outline-none disabled:opacity-50"
              />
              mm
            </span>
          </label>
        </div>

        <div className="rounded-lg border border-border p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              4. PIGMENT &amp; THREAD INK TONE
            </p>
            <span className="font-mono text-[11px] text-muted-foreground">
              HEX: {value.color.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {INK_TONES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => set("color", hex)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border transition-shadow",
                  value.color.toUpperCase() === hex
                    ? "border-destructive ring-2 ring-offset-1 ring-destructive/50"
                    : "border-border"
                )}
                style={{ backgroundColor: hex }}
              >
                {value.color.toUpperCase() === hex && (
                  <CheckIcon
                    className="size-3.5"
                    style={{ color: isLightColor(hex) ? "#111" : "#fff" }}
                  />
                )}
              </button>
            ))}
            <label className="relative flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
              <Pipette className="size-3.5" />
              Custom
              <input
                type="color"
                value={value.color}
                onChange={(e) => set("color", e.target.value)}
                onFocus={() => setCustomHexOpen(true)}
                onBlur={() => setCustomHexOpen(false)}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </label>
            {customHexOpen && (
              <span className="text-[11px] text-muted-foreground">Pick a colour…</span>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-slate-900 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            LIVE PREVIEW
          </span>
          <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px]">
            100% Combed Cotton Texture
          </span>
        </div>
        <div className="relative overflow-hidden rounded-md bg-slate-950/60">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-destructive/30" />
          <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-destructive/30" />
          <canvas ref={canvasElRef} className="block w-full" />
        </div>
        <div className="mt-3 space-y-2">
          <textarea
            value={value.value}
            onChange={(e) => set("value", e.target.value)}
            placeholder="Type your text… (use a new line for a second row)"
            rows={2}
            className="w-full rounded-md border border-white/15 bg-white/5 p-2 text-center text-sm text-white outline-none placeholder:text-white/40 focus-visible:border-white/30"
          />
          <div className="flex justify-center">
            <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] text-white">
              <TypeIcon className="size-3 text-destructive" />
              {dimensions.width} mm × {dimensions.height} mm
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

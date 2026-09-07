"use client"

import { useState } from "react"
import { CheckIcon, InfoIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type { Garment } from "@/app/(public)/shop/_data"
import { isLightColor } from "./product-customizer.constants"

export function ColorPickerDialog({
  garment,
  open,
  onOpenChange,
  colorId,
  onAccept,
}: {
  garment: Garment
  open: boolean
  onOpenChange: (open: boolean) => void
  colorId: string | undefined
  onAccept: (colorId: string) => void
}) {
  const [pendingColorId, setPendingColorId] = useState(colorId)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setPendingColorId(colorId)
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex-row items-center gap-2 space-y-0">
          <InfoIcon className="size-4 shrink-0 text-blue-500" />
          <DialogTitle>Select Color</DialogTitle>
          <DialogDescription className="sr-only">
            Choose a colour for {garment.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto rounded-lg border border-border bg-muted/40 p-4">
          <div className="grid grid-cols-6 gap-3 sm:grid-cols-8">
            {garment.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                title={color.name}
                onClick={() => setPendingColorId(color.id)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-lg border transition-shadow",
                  color.id === pendingColorId
                    ? "border-foreground ring-2 ring-offset-1 ring-foreground/40"
                    : "border-border/60"
                )}
                style={{ backgroundColor: color.swatch }}
              >
                {color.id === pendingColorId && (
                  <CheckIcon
                    className="size-4"
                    style={{ color: isLightColor(color.swatch) ? "#111" : "#fff" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-destructive text-white hover:bg-destructive/90"
            disabled={!pendingColorId}
            onClick={() => {
              if (pendingColorId) onAccept(pendingColorId)
              onOpenChange(false)
            }}
          >
            Accept →
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

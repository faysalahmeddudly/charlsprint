"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  orderTrackingSchema,
  type OrderTrackingInput,
} from "@/lib/validations/order-tracking"
import { orderService } from "@/services/order.service"
import { ApiClientError } from "@/services/api-client"
import type { OrderTrackingEvent } from "@/types"

const initialValues: OrderTrackingInput = { orderNumber: "", email: "" }

export function OrderTrackingForm() {
  const [values, setValues] = React.useState<OrderTrackingInput>(initialValues)
  const [events, setEvents] = React.useState<OrderTrackingEvent[] | null>(null)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setFormError(null)

    const result = orderTrackingSchema.safeParse(values)
    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? "Please check the form for errors")
      return
    }

    setIsSubmitting(true)
    try {
      const trackingEvents = await orderService.track(result.data)
      setEvents(trackingEvents)
    } catch (error) {
      setFormError(
        error instanceof ApiClientError ? error.message : "Unable to find that order"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="orderNumber" className="text-sm font-medium">
            Order number
          </label>
          <Input
            id="orderNumber"
            value={values.orderNumber}
            onChange={(e) => setValues((v) => ({ ...v, orderNumber: e.target.value }))}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email used at checkout
          </label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
        </div>

        {formError && <p className="text-sm text-destructive">{formError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Searching..." : "Track order"}
        </Button>
      </form>

      {events && (
        <ol className="space-y-3 border-l border-border pl-4">
          {events.map((event, i) => (
            <li key={i} className="space-y-0.5">
              <p className="text-sm font-medium">{event.label}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(event.timestamp).toLocaleString()}
                {event.location ? ` · ${event.location}` : ""}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

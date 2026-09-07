"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/checkout"
import { orderService } from "@/services/order.service"
import { ApiClientError } from "@/services/api-client"
import { useCart } from "@/hooks/use-cart"

const initialValues: CheckoutInput = {
  email: "",
  shippingAddress: {
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  },
  paymentMethod: "card",
}

export function CheckoutForm() {
  const { cart, clear } = useCart()
  const [values, setValues] = React.useState<CheckoutInput>(initialValues)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [orderNumber, setOrderNumber] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setFormError(null)

    const result = checkoutSchema.safeParse(values)
    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? "Please check the form for errors")
      return
    }

    setIsSubmitting(true)
    try {
      const order = await orderService.create(result.data)
      setOrderNumber(order.number)
      clear()
    } catch (error) {
      setFormError(error instanceof ApiClientError ? error.message : "Unable to place order")
    } finally {
      setIsSubmitting(false)
    }
  }

  function updateAddress<K extends keyof CheckoutInput["shippingAddress"]>(
    key: K,
    value: CheckoutInput["shippingAddress"][K]
  ) {
    setValues((v) => ({ ...v, shippingAddress: { ...v.shippingAddress, [key]: value } }))
  }

  if (orderNumber) {
    return (
      <p className="text-sm text-muted-foreground">
        Order <span className="font-medium text-foreground">{orderNumber}</span> placed
        successfully.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
      <p className="text-sm text-muted-foreground">
        {cart.items.length} item{cart.items.length === 1 ? "" : "s"} in your cart
      </p>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1.5">
          <label htmlFor="fullName" className="text-sm font-medium">
            Full name
          </label>
          <Input
            id="fullName"
            value={values.shippingAddress.fullName}
            onChange={(e) => updateAddress("fullName", e.target.value)}
          />
        </div>

        <div className="col-span-2 space-y-1.5">
          <label htmlFor="line1" className="text-sm font-medium">
            Address
          </label>
          <Input
            id="line1"
            value={values.shippingAddress.line1}
            onChange={(e) => updateAddress("line1", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <Input
            id="city"
            value={values.shippingAddress.city}
            onChange={(e) => updateAddress("city", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="state" className="text-sm font-medium">
            State
          </label>
          <Input
            id="state"
            value={values.shippingAddress.state}
            onChange={(e) => updateAddress("state", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="postalCode" className="text-sm font-medium">
            Postal code
          </label>
          <Input
            id="postalCode"
            value={values.shippingAddress.postalCode}
            onChange={(e) => updateAddress("postalCode", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <Input
            id="country"
            value={values.shippingAddress.country}
            onChange={(e) => updateAddress("country", e.target.value)}
          />
        </div>

        <div className="col-span-2 space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <Input
            id="phone"
            value={values.shippingAddress.phone}
            onChange={(e) => updateAddress("phone", e.target.value)}
          />
        </div>
      </div>

      {formError && <p className="text-sm text-destructive">{formError}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Placing order..." : "Place order"}
      </Button>
    </form>
  )
}

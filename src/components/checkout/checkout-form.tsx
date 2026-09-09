"use client";

import * as React from "react";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/checkout";
import { orderService } from "@/services/order.service";
import { ApiClientError } from "@/services/api-client";
import { useCart } from "@/hooks/use-cart";
import { ShippingInformationForm } from "./shipping-information-form";
import { OrderSummaryPanel } from "./order-summary-panel";

const initialValues: CheckoutInput = {
  email: "",
  shippingAddress: {
    fullName: "",
    phone: "",
    line1: "",
    state: "",
    postalCode: "",
    addressLabel: "home",
  },
  paymentMethod: "card",
};

export function CheckoutForm() {
  const { cart, clear } = useCart();
  const [values, setValues] = React.useState<CheckoutInput>(initialValues);
  const [saveAddress, setSaveAddress] = React.useState(true);
  const [errors, setErrors] = React.useState<Partial<Record<string, string>>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState<string | null>(null);

  function updateAddress<K extends keyof CheckoutInput["shippingAddress"]>(
    key: K,
    value: CheckoutInput["shippingAddress"][K]
  ) {
    setValues((v) => ({ ...v, shippingAddress: { ...v.shippingAddress, [key]: value } }));
  }

  async function handlePlaceOrder() {
    setFormError(null);

    const result = checkoutSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message;
      }
      setErrors(fieldErrors);
      setFormError("Please check the form for errors");
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const order = await orderService.create(result.data);
      setOrderNumber(order.number);
      clear();
    } catch (error) {
      setFormError(error instanceof ApiClientError ? error.message : "Unable to place order");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <p className="text-sm text-muted-foreground">
        Order <span className="font-medium text-foreground">{orderNumber}</span> placed
        successfully.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-12">
      <ShippingInformationForm
        values={values.shippingAddress}
        email={values.email}
        onEmailChange={(email) => setValues((v) => ({ ...v, email }))}
        onFieldChange={updateAddress}
        saveAddress={saveAddress}
        onSaveAddressChange={setSaveAddress}
        errors={errors}
      />
      <OrderSummaryPanel
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
        isSubmitting={isSubmitting}
        formError={formError}
      />
    </div>
  );
}

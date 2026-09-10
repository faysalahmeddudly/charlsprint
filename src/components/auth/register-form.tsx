"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { ApiClientError } from "@/services/api-client";

// NOTE: the Figma design includes a "Phone number" field that isn't part of
// the original RegisterInput/registerSchema. It's tracked locally here and
// sent alongside the validated fields on submit. If you want it validated
// too, add `phone` to registerSchema in "@/lib/validations/auth".
type RegisterFormValues = RegisterInput & { phone: string };

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

// Shared input styling — matches Figma "Frame 71": bg #F3F3F3, 1px border
// #636363 @ 20%, radius 10px, padding 12px/16px.
const inputClass =
  "h-auto w-full rounded-[10px] border border-[#636363]/20 bg-[#F3F3F3] px-4 py-3 text-sm text-[#000116] placeholder:text-[#636363] focus-visible:ring-1 focus-visible:ring-[#EF252C] focus-visible:ring-offset-0";

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof RegisterInput, string>>
  >({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);

    const { phone, ...rest } = values;
    const result = registerSchema.safeParse(rest);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof RegisterInput;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await authService.register({ ...result.data, phone });
      router.push("/");
    } catch (error) {
      setFormError(
        error instanceof ApiClientError
          ? error.message
          : "Unable to create account",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof RegisterFormValues>(
    key: K,
    value: RegisterFormValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  return (
    <div className="flex w-full flex-col items-center">
      {/* Brand logo — floats over the card's top border, per the Figma layout */}
      <Link
        href="/"
        className="relative z-10 mb-[-31px] flex h-[62px] w-[200px] items-center justify-center rounded-lg bg-white"
      >
        <Image
          src="/logo-black.png"
          alt="Charles Prints"
          width={149}
          height={62}
          className="rounded-lg object-contain"
          priority
        />
      </Link>

      {/* Card — Frame 75: border #000116, radius 10, padding 60/30/30/30 */}
      <div className="w-full max-w-[590px] rounded-[10px] border border-[#000116] bg-white px-[30px] pb-[30px] pt-[60px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <h2 className="text-[32px] font-semibold leading-none text-[#636363]">
            Create an account
          </h2>

          {/* Frame 74 — field group, gap 24 */}
          <div className="flex flex-col gap-6">
            {/* Frame 72 — name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-[#000116]"
              >
                Your name
              </label>
              <Input
                id="name"
                autoComplete="name"
                placeholder="ex: Adil Hasan"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-invalid={!!errors.name}
                className={inputClass}
              />
              {errors.name && (
                <p className="text-xs text-[#EF252C]">{errors.name}</p>
              )}
            </div>

            {/* Frame 86 — phone + email row, gap 24 */}
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-[#000116]"
                >
                  Phone number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="ex: 0123456789"
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#000116]"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@example.com"
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-xs text-[#EF252C]">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Frame 87 — password + confirm, gap 24 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#000116]"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter a password"
                  value={values.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  aria-invalid={!!errors.password}
                  className={inputClass}
                />
                <div className="flex items-center gap-[7px]">
                  <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#EF252C] text-[8px] font-bold leading-none text-white">
                    i
                  </span>
                  <p className="text-xs font-light text-[#000116]">
                    Passwords must be at least 6 characters.
                  </p>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#EF252C]">{errors.password}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-[#000116]"
                >
                  Re-enter password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter given password"
                  value={values.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  aria-invalid={!!errors.confirmPassword}
                  className={inputClass}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-[#EF252C]">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {formError && <p className="text-sm text-[#EF252C]">{formError}</p>}

          {/* Frame 79 — button, terms, social login, gap 24 */}
          <div className="flex flex-col gap-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-auto w-full rounded-[10px] bg-[#EF252C] px-[66px] py-3 text-base font-bold text-white hover:bg-[#EF252C]/90 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create"}
            </Button>

            <p className="text-sm text-[#636363]">
              By continuing, you agree to Charles Prints{" "}
              <Link href="/terms" className="text-[#EF252C]">
                Conditions of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#EF252C]">
                Privacy Notice
              </Link>
              .
            </p>

            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-medium text-[#636363]">
                or login with
              </p>
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  aria-label="Continue with Google"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <Image src="/google-logo.png" alt="" width={36} height={36} />
                </button>
                <button
                  type="button"
                  aria-label="Continue with Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/facebook-logo.png"
                    alt=""
                    width={36}
                    height={36}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Frame 83 — "Already have an account? Sign in ⌄" */}
      <p className="mt-6 flex items-center gap-1 text-base text-[#636363]">
        Already have an account?{" "}
        <Link href="/login" className="flex items-center gap-1 text-[#EF252C]">
          Sign in
          <ChevronDown className="h-4 w-4 text-[#000116]" />
        </Link>
      </p>
    </div>
  );
}

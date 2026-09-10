"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { ApiClientError } from "@/services/api-client";

type LoginFormValues = LoginInput;

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

// Shared input styling — matches Figma "Frame 71": bg #F3F3F3, 1px border
// #636363 @ 20%, radius 10px, padding 12px/16px.
const inputClass =
  "h-auto w-full rounded-[10px] border border-[#636363]/20 bg-[#F3F3F3] px-4 py-3 text-sm text-[#000116] placeholder:text-[#636363] focus-visible:ring-1 focus-visible:ring-[#EF252C] focus-visible:ring-offset-0";

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof LoginInput, string>>
  >({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError(null);

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginInput;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await authService.login(result.data);
      router.push("/");
    } catch (error) {
      setFormError(
        error instanceof ApiClientError ? error.message : "Unable to sign in",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof LoginFormValues>(
    key: K,
    value: LoginFormValues[K],
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  return (
    <div className="flex font-rubik w-full px-4 sm:px-0 flex-col items-center">
      {/* Brand logo — floats over the card's top border, per the Figma layout */}
      <Link
        href="/"
        className="relative z-10 mb-[-31px] flex h-[62px] w-[200px] items-center justify-center rounded-lg bg-white"
      >
        <Image
          src="/logo.png"
          alt="Charles Prints"
          width={149}
          height={62}
          className="rounded-lg object-contain"
          priority
        />
      </Link>

      {/* border #000116, radius 10, padding 60/30/30/30 */}
      <div className="w-full max-w-[419px] rounded-[10px] border border-[#000116] bg-white px-5 pb-6 pt-10 sm:px-[30px] sm:pb-[30px] sm:pt-[60px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-10">
          <h2 className="text-2xl sm:text-[32px] font-semibold leading-none text-[#636363]">
            Sign in
          </h2>

          {/*  — field group, gap 24 */}

          {formError && <p className="text-sm text-[#EF252C]">{formError}</p>}

          <div className="flex flex-col gap-3 lg:gap-[22px]">
            <div className="flex flex-col gap-2">
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

            {/* Frame 87 — password + confirm, gap 24 */}
            <div className="flex flex-col gap-3 lg:gap-6">
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
            </div>
          </div>

          {/*  — button, terms, social login, gap 24 */}
          <div className="flex flex-col gap-3 lg:gap-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-auto w-full rounded-[10px] bg-[#EF252C] px-[66px] py-3 text-base font-bold text-white hover:bg-[#EF252C]/90 disabled:opacity-60"
            >
              {isSubmitting ? "Signing account..." : "Sign in"}
            </Button>

            <div className="flex flex-col items-center gap-4">
              {/* <p className="text-sm font-medium text-[#636363]">
                or login with
              </p> */}

              <div>
                {" "}
                {/* <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    aria-label="Continue with Google"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  >
                    <Image src="/google.png" alt="" width={36} height={36} />
                  </button>
                  <button
                    type="button"
                    aria-label="Continue with Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  >
                    <Image src="/fb.png" alt="" width={36} height={36} />
                  </button>
                </div> */}
                <div className="flex items-start  gap-2">
                  <Checkbox className="mt-1 "></Checkbox>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-1 text-base text-[#636363]">
                      Keep me signed in.{" "}
                      <Link
                        href="/login"
                        className="flex items-center gap-1 text-[#EF252C]"
                      >
                        Details
                        <ChevronDown className="h-4 w-4 text-[#000116]" />
                      </Link>
                    </div>

                    <h1 className="text-xs   text-[#636363]">
                      Choosing &ldquo;Keep me signed in&rdquo; reduces the
                      number of times you&apos;re asked to Sign-In on this
                      device. To keep your account secure, use this option only
                      on your personal devices.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* from footer */}
      <div className=" flex flex-col items-center pt-10 gap-[18px] ">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-9 text-[#636363] text-xs">
          <h1>Conditions of Use</h1>
          <h1> Privacy Notice</h1>
          <h1> Help </h1>
        </div>

        <h1 className="text-[#000116] text-xs">© 2026, charlesprints.com</h1>
      </div>
    </div>
  );
}

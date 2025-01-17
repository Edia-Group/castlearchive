"use client"
import { useFormState } from "react-dom"
import Input from "@modules/common/components/input"
import { requestPasswordReset } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { useState, useEffect } from "react"

type FormState = {
  success?: boolean
  error?: string
} | null

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const RequestReset = ({ setCurrentView }: Props) => {
  const [formState, formAction] = useFormState<FormState, FormData>(
    requestPasswordReset, 
    null
  )
  
  if (formState?.success) {
    return (
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="text-large-semi uppercase mb-6">Check Your Email</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-8">
          If an account exists with that email, you will receive a password reset link.
        </p>
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="w-full btn-primary"
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Reset Password</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Enter your email address to receive a password reset link.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
        </div>
        <ErrorMessage 
          error={formState?.error} 
          data-testid="request-reset-password-error-message" 
        />
        <SubmitButton className="w-full mt-6">Send Reset Link</SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Remember your password?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
      </span>
    </div>
  )
}

export default RequestReset
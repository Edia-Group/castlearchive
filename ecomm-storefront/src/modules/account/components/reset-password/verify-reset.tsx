"use client"
import { useFormState } from "react-dom"
import Input from "@modules/common/components/input"
import { verifyPasswordReset } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

type StateType = {
  success: boolean
  error: string | null
  message: string
} | null

const VerifyReset = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [state, formAction] = useFormState<StateType, FormData>(verifyPasswordReset, null)

  if (!token) {
    return (
      <div className="max-w-sm w-full flex flex-col items-center">
        <p className="text-center text-base-regular text-ui-fg-base">
          Invalid or expired reset token.
        </p>
      </div>
    )
  }

  if (state?.success) {
    return (
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="text-large-semi uppercase mb-6">Password Reset Successful</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-8">
          Your password has been successfully reset.
        </p>
        <Link 
          href="/account/login" 
          className="w-full btn btn-primary py-3 text-center bg-black text-white"
        >
          Return to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Reset Password</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Enter your email and new password.
      </p>
      <form className="w-full" action={formAction}>
        <input type="hidden" name="token" value={token} />
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
          />
          <Input
            label="New Password"
            name="password"
            type="password"
            required
          />
          <Input
            label="Confirm New Password"
            name="confirm_password"
            type="password"
            required
          />
        </div>
        {state?.error && (
          <ErrorMessage error={state.error} data-testid="reset-password-error-message" />
        )}
        <SubmitButton className="w-full mt-6">Reset Password</SubmitButton>
      </form>
    </div>
  )
}

export default VerifyReset
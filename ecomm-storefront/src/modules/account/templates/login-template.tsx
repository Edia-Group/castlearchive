"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import RequestReset from "@modules/account/components/reset-password/request-reset"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  RESET_PASSWORD = "reset-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="w-full flex justify-start px-8 py-8 font-mono">
      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <Login setCurrentView={setCurrentView} />
      ) : currentView === LOGIN_VIEW.REGISTER ? (
        <Register setCurrentView={setCurrentView} />
      ) : (
        <RequestReset setCurrentView={setCurrentView} />
      )}
    </div>
  )
}


export default LoginTemplate

"use client"

import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"
import Button from "@/components/Button"
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/utils/constans"
import { loginHandleForm } from "./actions"
import { useActionState } from "react"

function Login() {
    const [state, action] = useActionState(loginHandleForm, null)

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Log in with email!</span>
            </div>
            <form action={action} className="flex flex-col gap-2">
                <InputForm
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    errors={state?.fieldErrors.email}
                />
                <InputForm
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    errors={state?.fieldErrors.password}
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    pwIcon={true}
                />
                <Button text="Login" />
            </form>
            <SMSLogin />
        </div>
    )
}

export default Login
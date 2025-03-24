"use client"

import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"
import Button from "@/components/Button"
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/utils/constants"
import { loginHandleForm } from "./actions"
import { useActionState } from "react"

function Login() {
    const [state, dispatch] = useActionState(loginHandleForm, {
        email: "",
        password: "",
        error: {
            formErrors: [],
            fieldErrors: {
                email: [],
                password: [],
            }
        }
    })

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Log in with email!</span>
            </div>
            <form action={dispatch} className="flex flex-col gap-2">
                <InputForm
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    defaultValue={state?.email ?? ""}
                />
                <InputForm
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    errors={state?.error.fieldErrors.password}
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                    pwIcon={true}
                    defaultValue={state?.password ?? ""}
                />
                <Button text="Login" />
            </form>
            <SMSLogin />
        </div>
    )
}

export default Login
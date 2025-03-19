"use client"

import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"
import { useActionState } from "react"
import { createAccount } from "./actions"
import Button from "@/components/Button"
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/utils/constans"

function CreateAccount() {
    const [state, dispatch] = useActionState(createAccount, null)

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Fill in the form below to join!</span>
            </div>
            <form action={dispatch} className="flex flex-col gap-2">
                <InputForm
                    name="username"
                    type="text"
                    placeholder="Username"
                    required={true}
                    errors={state?.fieldErrors.username}
                    minLength={USERNAME_MIN_LENGTH}
                    maxLength={USERNAME_MAX_LENGTH}
                />
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
                    pwIcon={true}
                    minLength={PASSWORD_MIN_LENGTH}
                    maxLength={PASSWORD_MAX_LENGTH}
                />
                <InputForm
                    name="password_confirm"
                    type="password"
                    placeholder="Password Confirm"
                    required={true}
                    errors={state?.fieldErrors.password_confirm}
                    pwIcon={true} />
                <Button text="Create Account" />
            </form>
            <SMSLogin />
        </div>
    )
}

export default CreateAccount
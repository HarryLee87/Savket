"use client"

import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"
import { useActionState } from "react"
import { createAccount } from "./actions"
import Button from "@/components/Button"

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
                    name="username" type="text" placeholder="Username" required={true} errors={state?.fieldErrors.username} />
                <InputForm
                    name="email" type="email" placeholder="Email" required={true} errors={state?.fieldErrors.email} />
                <InputForm
                    name="password" type="password" placeholder="Password" required={true} errors={state?.fieldErrors.password} pwIcon={true} />
                <InputForm
                    name="password_confirm" type="password" placeholder="Password Confirm" required={true} errors={state?.fieldErrors.password_confirm} pwIcon={true} />
                <Button text="Create Account" />
            </form>
            <SMSLogin />
        </div>
    )
}

export default CreateAccount
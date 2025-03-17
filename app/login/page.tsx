"use client"

import FormBtn from "@/components/FormBtn"
import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"
import { handleForm } from "./actions"
import { useActionState } from "react"

function Login() {
    const [state, action] = useActionState(handleForm, null)

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Log in with email!</span>
            </div>
            <form action={action} className="flex flex-col gap-2">
                <InputForm
                    name="email" type="email" placeholder="Email" required={true} errors={[]} />
                <InputForm
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    errors={state?.errors ?? []} />
                <FormBtn text="Login" />
            </form>
            <SMSLogin />
        </div>
    )
}

export default Login
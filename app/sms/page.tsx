"use client"

import Button from "@/components/Button"
import InputForm from "@/components/InputForm"
import { useActionState } from "react"
import { SMSHandleForm } from "./actions"

function SMS() {
    const [state, dispatch] = useActionState(SMSHandleForm, null)

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">SMS Login</h1>
                <span className="text-xl">Verify your phone number</span>
            </div>
            <form action={dispatch} className="flex flex-col gap-2">
                <InputForm
                    name="phone" type="number" placeholder="Phone number" required={true} errors={state?.fieldErrors.phone} />
                <InputForm
                    name="token" type="number" placeholder="Verification code" required={true} errors={state?.fieldErrors.token} />
                <Button text="Send" />
            </form>
        </div>
    )
}

export default SMS
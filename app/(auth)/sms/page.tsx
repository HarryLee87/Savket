"use client"

import Button from "@/components/Button"
import InputForm from "@/components/InputForm"
import { SMSHandleForm } from "./actions"
import { useActionState } from "react"

const initailState = {
    token: false,
    phone: "",
    error: undefined
}

function SMS() {
    const [state, dispatch] = useActionState(SMSHandleForm, initailState)

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">SMS Login</h1>
                <span className="text-xl">Verify your phone number</span>
            </div>
            <form action={dispatch} className="flex flex-col gap-2">
                {state.token ? (
                    <>
                        <input type="hidden" name="phone" value={state.phone} />
                        <InputForm
                            name="token"
                            type="number"
                            placeholder="Verification code"
                            required
                            min={100000}
                            max={999999}
                            errors={state.error?.formErrors}
                        />
                    </>
                ) : (
                    <InputForm
                        name="phone"
                        type="text"
                        placeholder="Phone number"
                        required
                        errors={state.error?.formErrors}
                    />
                )}
                <Button text={state.token ? "Verify" : "Send Verification SMS"} />
            </form>
        </div>
    )
}

export default SMS
"use client"

import Button from "@/components/Button"
import InputForm from "@/components/InputForm"
import { SMSHandleForm } from "./actions"
import { useFormState } from "react-dom"

const initialState = {
    token: false,
    phone: "",
}

function SMS() {
    const [state, dispatch] = useFormState(SMSHandleForm, initialState)

    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">SMS Login</h1>
                <span className="text-xl">Verify your phone number</span>
            </div>
            <form action={dispatch} className="flex flex-col gap-2">
                <InputForm
                    name="phone"
                    type="number"
                    placeholder="Phone number"
                    required={true}
                    defaultValue={state.phone}
                // errors={state?.fieldErrors.phone} 
                />
                {state.token ? (<InputForm
                    name="token"
                    type="number"
                    placeholder="Verification code"
                    required={true}
                    // errors={state?.fieldErrors.token}
                    min={100000}
                    max={999999}
                />) : null}
                <Button text="Send" />
            </form>
        </div>
    )
}

export default SMS
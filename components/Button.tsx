"use client"

import { useFormStatus } from "react-dom"

interface ButtonProps {
    text: string
}
function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus()
    return (
        <button className="primary-btn p-1.5 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" disabled={pending}>
            {pending ? "Loading... " : text}
        </button>
    )
}

export default Button
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function CreateAccount() {
    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Fill in the form below to join!</span>
            </div>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <input placeholder="Username"
                        type="text"
                        required
                        className="bg-transparent border w-full focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-lime-500 rounded-md border-none placeholder:text-neutral-500 p-2 "
                    />
                    <span className="text-red-500">Input Error</span>
                </div>
                <button className="primary-btn p-1.5">Create Account</button>
            </form>
            <div className="w-full h-px bg-neutral-500" />
            <div>
                <Link className="primary-btn flex h-10 items-center justify-center gap-3" href="/sms">
                    <span><ChatBubbleLeftRightIcon className="h-6 w-6" /></span>
                    <span>Sign up with SMS</span>
                </Link>
            </div>
        </div>
    )
}

export default CreateAccount
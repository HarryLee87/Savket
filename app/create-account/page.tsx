
import InputForm from "@/components/InputForm"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function CreateAccount() {
    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Fill in the form below to join!</span>
            </div>
            <form className="flex flex-col gap-2">
                <InputForm
                    type="text" placeholder="Username" required={true} errors={[]} />
                <InputForm
                    type="email" placeholder="Email" required={true} errors={[]} />
                <InputForm
                    type="password" placeholder="Password" required={true} errors={[]} />
                <InputForm
                    type="password" placeholder="Password Confirm" required={true} errors={[]} />
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
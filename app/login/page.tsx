
import FormBtn from "@/components/FormBtn"
import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"

function Login() {
    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Hello!</h1>
                <span className="text-xl">Log in with email!</span>
            </div>
            <form className="flex flex-col gap-2">
                <InputForm
                    type="email" placeholder="Email" required={true} errors={[]} />
                <InputForm
                    type="password" placeholder="Password" required={true} errors={[]} />
                <FormBtn text="Login" loading={false} />
            </form>
            <SMSLogin />
        </div>
    )
}

export default Login
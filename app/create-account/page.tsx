
import FormBtn from "@/components/FormBtn"
import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"

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
                <FormBtn text="Create Account" loading={false} />
            </form>
            <SMSLogin />
        </div>
    )
}

export default CreateAccount
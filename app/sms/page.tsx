
import FormBtn from "@/components/FormBtn"
import InputForm from "@/components/InputForm"
import SMSLogin from "@/components/SMSLogin"

function SMS() {
    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">SMS Login</h1>
                <span className="text-xl">Verify your phone number</span>
            </div>
            <form className="flex flex-col gap-2">
                <InputForm
                    type="number" placeholder="Phone number" required={true} errors={[]} />
                <InputForm
                    type="number" placeholder="Verification code" required={true} errors={[]} />
                <FormBtn text="Send" loading={false} />
            </form>
        </div>
    )
}

export default SMS
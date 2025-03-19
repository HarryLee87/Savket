
import Button from "@/components/Button"
import InputForm from "@/components/InputForm"

function SMS() {
    return (
        <div className="flex flex-col gap-10 p-4 mx-auto max-w-sm *:font-medium">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">SMS Login</h1>
                <span className="text-xl">Verify your phone number</span>
            </div>
            <form className="flex flex-col gap-2">
                <InputForm
                    name="phone" type="number" placeholder="Phone number" required={true} errors={[]} />
                <InputForm
                    name="verfication_code" type="number" placeholder="Verification code" required={true} errors={[]} />
                <Button text="Send" />
            </form>
        </div>
    )
}

export default SMS
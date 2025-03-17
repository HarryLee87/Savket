interface InputFormProps {
    type: string,
    placeholder: string,
    required: boolean,
    errors: string[]
}

function InputForm({
    type,
    placeholder,
    required,
    errors }: InputFormProps) {
    return (
        <div className="flex flex-col gap-2">
            <input placeholder={placeholder}
                type={type}
                required={required}
                className="bg-transparent border w-full focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-lime-500 rounded-md border-none placeholder:text-neutral-400 p-2 "
            />
            <div className="flex flex-col">
                {errors.map((error, index) =>
                    <span key={index} className="text-red-500">
                        {error}
                    </span>)}
            </div>

        </div>
    )
}

export default InputForm
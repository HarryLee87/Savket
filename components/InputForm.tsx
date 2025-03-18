import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

interface InputFormProps {
    type: string,
    placeholder: string,
    required: boolean,
    errors?: string[]
    name: string
    pwIcon?: boolean
}

function InputForm({
    type,
    placeholder,
    required,
    errors = [],
    name,
    pwIcon
}: InputFormProps,
) {
    const [visible, setVisible] = useState<boolean>(false)

    const handleVisible = () => {
        setVisible((prev) => !prev)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="input-container">
                <div className="input-icon">
                    {pwIcon ?
                        (visible ? <EyeSlashIcon className="pw-icon" onClick={handleVisible} />
                            : <EyeIcon className="pw-icon" onClick={handleVisible} />) : null}
                </div>
                <input
                    name={name}
                    placeholder={placeholder}
                    type={visible ? "text" : type}
                    required={required}
                    className="input-field"
                />
            </div>
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
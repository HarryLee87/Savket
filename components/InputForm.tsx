import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { InputHTMLAttributes, useState } from "react"

interface InputFormProps {
    type: string,
    errors?: string[]
    name: string
    pwIcon?: boolean
}

function InputForm({
    type,
    errors = [],
    name,
    pwIcon,
    ...rest
}: InputFormProps & InputHTMLAttributes<HTMLInputElement>,
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
                        (visible ? <EyeIcon className="pw-icon" onClick={handleVisible} />
                            : <EyeSlashIcon className="pw-icon" onClick={handleVisible} />) : null}
                </div>
                <input
                    name={name}
                    type={visible ? "text" : type}
                    className="input-field"
                    {...rest}
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
interface FormBtnProps {
    text: string
    loading: boolean
}
function FormBtn({ text, loading }: FormBtnProps) {
    return (
        <button className="primary-btn p-1.5 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" disabled={loading}>{loading ? "Loading... " : text}</button>
    )
}

export default FormBtn
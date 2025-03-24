import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid"
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import GoogleLogo from "@/public/google-icon-logo-svgrepo-com.svg"
import Image from "next/image"
import { signInWithGoogle } from "@/services/auth"


function SMSLogin() {
    return (
        <>
            <div className="w-full h-px bg-neutral-500" />
            <div className="flex flex-col gap-2">
                <Link className="primary-btn flex h-10 items-center justify-center gap-3" href="/sms">
                    <span><ChatBubbleLeftRightIcon className="h-6 w-6" /></span>
                    <span>Continue with SMS</span>
                </Link>
                {/* need to register kakao biz app with a business number in order to receive email_account */}
                {/* <form className="primary-btn bg-[#FBE304] flex h-10 items-center justify-center gap-3" action={signWithKakao}>
                    <span><ChatBubbleOvalLeftIcon className="h-6 w-6 text-[#181600]" /></span>
                    <button className="text-[#181600]">Continue with KAKAOTALK</button>
                </form> */}
                <form className="primary-btn bg-white flex h-10 items-center justify-center gap-3" action={signInWithGoogle}>
                    <span><Image src={GoogleLogo} className="h-6 w-6" alt="google_logo" /></span>
                    <button className="text-[#181600]">Continue with GOOGLE</button>
                </form>
            </div>
        </>
    )
}

export default SMSLogin
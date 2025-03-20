import { ChatBubbleOvalLeftIcon } from "@heroicons/react/20/solid"
import { ChatBubbleLeftRightIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import GoogleLogo from "@/public/google-icon-logo-svgrepo-com.svg"
import Image from "next/image"


function SMSLogin() {
    return (
        <>
            <div className="w-full h-px bg-neutral-500" />
            <div className="flex flex-col gap-2">
                <Link className="primary-btn flex h-10 items-center justify-center gap-3" href="/sms">
                    <span><ChatBubbleLeftRightIcon className="h-6 w-6" /></span>
                    <span>Continue with SMS</span>
                </Link>
                <Link className="primary-btn bg-[#FBE304] flex h-10 items-center justify-center gap-3" href="/kakao">
                    <span><ChatBubbleOvalLeftIcon className="h-6 w-6 text-[#181600]" /></span>
                    <span className="text-[#181600]">Continue with KAKAOTALK</span>
                </Link>
                <Link className="primary-btn bg-white flex h-10 items-center justify-center gap-3" href="/google">
                    <span><Image src={GoogleLogo} className="h-6 w-6" alt="google_logo" /></span>
                    <span className="text-[#181600]">Continue with GOOGLE</span>
                </Link>
            </div>
        </>
    )
}

export default SMSLogin
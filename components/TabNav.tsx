"use client"

import {
    HomeIcon as HomeIconSolid,
    NewspaperIcon as NewspaperIconSolid,
    ChatBubbleBottomCenterTextIcon,
    VideoCameraIcon as VideoCameraIconSolid,
    UserIcon as UserIconSolid
} from "@heroicons/react/24/solid";
import {
    HomeIcon as HomeIconOutline,
    NewspaperIcon as NewspaperIconOutline,
    ChatBubbleBottomCenterIcon,
    VideoCameraIcon as VideoCameraIconOutline,
    UserIcon as UserIconOutline
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabNav() {
    const pathname = usePathname()
    return (
        <div className="fixed bottom-0 grid grid-cols-5 border-neutral-600 border-t py-3 -mx-2 max-w-md w-full *:text-white">
            <Link href="/products" className="tab-nav-icon">
                {pathname === "/products" ?
                    <HomeIconSolid className="w-7 h-7" />
                    : <HomeIconOutline className="w-7 h-7" />}
                <span>Home</span>
            </Link>
            <Link href="/life" className="tab-nav-icon">
                {pathname === "/life" ?
                    <NewspaperIconSolid className="w-7 h-7" />
                    : <NewspaperIconOutline className="w-7 h-7" />}
                <span>Life</span>
            </Link>
            <Link href="/chat" className="tab-nav-icon">
                {pathname === "/chat" ?
                    <ChatBubbleBottomCenterTextIcon className="w-7 h-7" />
                    : <ChatBubbleBottomCenterIcon className="w-7 h-7" />}
                <span>Chat</span>
            </Link>
            <Link href="/live" className="tab-nav-icon">
                {pathname === "/live" ?
                    <VideoCameraIconSolid className="w-7 h-7" />
                    : <VideoCameraIconOutline className="w-7 h-7" />}
                <span>Live</span>
            </Link>
            <Link href="/profile" className="tab-nav-icon">
                {pathname === "/profile" ?
                    <UserIconSolid className="w-7 h-7" />
                    : <UserIconOutline className="w-7 h-7" />}
                <span>Profile</span>
            </Link>
        </div>
    )
}
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
        <div className="fixed bottom-0 grid grid-cols-5 bg-neutral-800 border-neutral-600 border-t py-3 -mx-2 max-w-md w-full">
            {navItems.map(({ href, label, selectedIcon, unselectedIcon }) => (
                <Link key={href} href={href} className="tab-nav-icon">
                    {pathname === href ? selectedIcon : unselectedIcon}
                    <span className={pathname === href ? "text-lime-500" : "text-white"}>
                        {label}
                    </span>
                </Link>
            ))}
        </div>
    )
}

const navItems = [
    {
        href: "/products",
        label: "Home",
        selectedIcon: <HomeIconSolid className="w-7 h-7" />,
        unselectedIcon: <HomeIconOutline className="w-7 h-7 text-white" />,
    },
    {
        href: "/life",
        label: "Life",
        selectedIcon: <NewspaperIconSolid className="w-7 h-7" />,
        unselectedIcon: <NewspaperIconOutline className="w-7 h-7 text-white" />,
    },
    {
        href: "/chat",
        label: "Chat",
        selectedIcon: <ChatBubbleBottomCenterTextIcon className="w-7 h-7" />,
        unselectedIcon: <ChatBubbleBottomCenterIcon className="w-7 h-7 text-white" />,
    },
    {
        href: "/live",
        label: "Live",
        selectedIcon: <VideoCameraIconSolid className="w-7 h-7" />,
        unselectedIcon: <VideoCameraIconOutline className="w-7 h-7 text-white" />,
    },
    {
        href: "/profile",
        label: "Profile",
        selectedIcon: <UserIconSolid className="w-7 h-7" />,
        unselectedIcon: <UserIconOutline className="w-7 h-7 text-white" />,
    },
];
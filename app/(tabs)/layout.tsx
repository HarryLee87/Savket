import TabNav from "@/components/TabNav";

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-md min-h-screen px-2 mx-auto">
            <div className="pb-16">
                {children}
            </div>
            <TabNav />
        </div>
    )
}
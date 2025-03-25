import TabNav from "@/components/TabNav";

export default function TabLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-md min-h-screen py-3 px-2 mx-auto">
            {children}
            <TabNav />
        </div>
    )
}
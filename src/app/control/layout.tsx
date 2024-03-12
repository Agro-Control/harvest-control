import Sidebar from "@/components/nav/sidebar";

export default function ControlLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full flex-row items-center">
            <Sidebar />
            <div className="flex h-full ml-[16vw] w-full flex-col overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}

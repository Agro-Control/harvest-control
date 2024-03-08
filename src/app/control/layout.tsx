import Sidebar from "@/components/nav/sidebar";

export default function ControlLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row w-full">
            <Sidebar />
            <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
    );
}

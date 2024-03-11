import NavButton from "./nav-button";
import SidebarHeader from "./sidebar-header";

const Sidebar = () => {
    return (
        <div className="fixed left-0 top-0 flex h-screen w-[17vw] flex-col gap-12 bg-sidebar drop-shadow-side">
            <SidebarHeader />

            <div className="flex flex-col gap-3 px-8 ">

                <NavButton />
                <NavButton />
                <NavButton />
                <NavButton />
                <NavButton />
                <NavButton />
            </div>
            <div className="fixed bottom-0 left-0 flex h-[20vh] w-full flex-col bg-transparent">
                <div className="flex h-[1px]  w-full flex-none bg-divider" />
            </div>
        </div>
    );
};
export default Sidebar;

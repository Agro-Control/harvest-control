import SidebarHeader from "./sidebar-header";

const Sidebar = () => {
    return (
        <div className="left-o bg-sidebar drop-shadow-side fixed top-0 flex h-screen w-[17vw] flex-col ">
            <SidebarHeader />
        </div>
    );
};
export default Sidebar;

import ActiveUsersCard from "@/components/control/dashboard/active-users-card";
import ActiveOrdersCard from "@/components/control/dashboard/active-orders-card";
import OperativeMachinesCard from "@/components/control/dashboard/operative-machines-card";

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 overflow-hidden px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Dashboard</p>
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2  xl:grid-cols-3">
                <ActiveUsersCard />
                <OperativeMachinesCard />
                <ActiveOrdersCard />
            </div>
        </div>
    );
}

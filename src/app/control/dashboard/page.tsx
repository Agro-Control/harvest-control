export default function Dashboard() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 overflow-hidden px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Dashboard</p>
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 flex h-full w-full flex-col border border-divider items-start justify-between gap-4 rounded-2xl bg-white p-4 md:max-h-[121px]">
                            <div className="flex flex-row w-full gap-4">
                                <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg bg-gray-500/10" >a</div>
                                <div className="flex flex-col" >  
                                <p className="
                                line-clamp-1
                                text-base
                                font-bold
                                leading-5
                                text-green-950

                            ">Listagem de usuarios</p>
                                    <p className="
                                    line-clamp-1
                                    text-xs
                                    font-normal
                                    leading-4
                                text-gray-300

                                ">Usuarios</p>
                                </div>
                            </div>

                </div>
                <div className="col-span-1 flex h-full w-full flex-col border border-divider items-start justify-between gap-4 rounded-2xl bg-white p-4 md:max-h-[121px]">
                            <div className="flex flex-row w-full gap-4">
                                <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg bg-gray-500/10" >a</div>
                                <div className="flex flex-col" >  
                                <p className="
                                line-clamp-1
                                text-base
                                font-bold
                                leading-5
                                text-green-950

                            ">Listagem de usuarios</p>
                                    <p className="
                                    line-clamp-1
                                    text-xs
                                    font-normal
                                    leading-4
                                text-gray-300

                                ">Usuarios</p>
                                </div>
                            </div>

                </div>
                <div className="col-span-1 flex h-full w-full flex-col border border-divider items-start justify-between gap-4 rounded-2xl bg-white p-4 md:max-h-[121px]">
                            <div className="flex flex-row w-full gap-4">
                                <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg bg-gray-500/10" >a</div>
                                <div className="flex flex-col" >  
                                <p className="
                                line-clamp-1
                                text-base
                                font-bold
                                leading-5
                                text-green-950

                            ">Listagem de usuarios</p>
                                    <p className="
                                    line-clamp-1
                                    text-xs
                                    font-normal
                                    leading-4
                                text-gray-300

                                ">Usuarios</p>
                                </div>
                            </div>

                </div>
            </div>
        </div>
    );
}

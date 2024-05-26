
"use client";
import {User, Users, Pulse} from "@phosphor-icons/react";


const ActiveUsersCard = () => {


    return (
        <div className="col-span-2 lg:col-span-1 flex h-full w-full flex-col items-start justify-between gap-6 rounded-2xl border border-divider bg-white p-4 lg:max-h-[130px]">
        <div className="flex w-full flex-row gap-4">
            <div className="flex  h-9 w-9  items-center justify-center overflow-hidden rounded-lg
            
            bg-green-400/50
            border
            border-green-500
            ">
                <User className="h-5 w-5 text-green-950 " />
            </div>

            <div className="flex  flex-row md:flex-col">
                <p
                    className="
                    line-clamp-1
                    text-base
                    font-bold
                    leading-5
                    text-green-950

                "
                >
                    Relação de usuarios
                </p>
                <p
                    className="
                        line-clamp-1
                        text-xs
                        font-normal
                        leading-4
                    text-gray-500

                    "
                >
                    Totais e Ativos
                </p>
            </div>
        </div>
        <div className="flex w-full flex-col gap-2 lg:gap-0 lg:flex-row items-center justify-between">
            <div
                className="flex h-9 w-full
        flex-row
        items-center
        justify-center
        gap-3
        rounded-full
        bg-gray-500/10
        border border-divider   
        px-3
        text-base
        font-normal
        text-black
        xl:w-auto
"
            >
                <Users className="h-5 w-5 text-green-950 " />
                <p> Usuarios totais: 123</p>
            </div>

            <div className="flex flex-1 h-8 max-w-[1px] bg-divider"/>
        
            <div
                className="flex h-9 w-full
        flex-row
        items-center
        justify-center
        gap-3
        rounded-full
        bg-gray-500/10
        border border-divider 
        px-3
        text-base
        font-normal
        text-black
        xl:w-auto
"
            >
                <Pulse className="h-5 w-5 text-green-900 " />
                Usuarios ativos: 78
            </div>
        </div>
    </div>
    )
}
export default ActiveUsersCard;


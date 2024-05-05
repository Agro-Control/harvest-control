"use client";
import {User as UserIcon, EnvelopeSimple, House, AddressBook, Pencil, Phone} from "@phosphor-icons/react";
import EditProfileModal from "./edit-profile-modal";
import logoRounded from "@/assets/logo-rounded.svg";
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "react-i18next";
import User from "@/types/user";


interface UserInformationCardProps {
    user: User | null; 
}

const UserInformationCard = ({user}: UserInformationCardProps) => {
    const {t} = useTranslation();
    const userData =  user ? user.usuario : null;
    const formattedPhone = userData?.telefone ? userData.telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3") : '';

    return (
        <div className="flex w-full flex-col items-start justify-start gap-4 min-h-[115px]">
            <div className="flex w-full flex-row items-center justify-start gap-2">
                <img src={logoRounded.src} className="h-[24px] w-[24px]" />
                    <p className="font-medium">Informações do usuário</p>
                <EditProfileModal>
                <Pencil className="h-4 w-4 cursor-pointer " weight="fill" color="#000" />
                </EditProfileModal>
            </div>
            <div className="flex h-[2px]  w-full flex-none bg-divider" />

            <div className="mt-4 grid w-full grid-cols-5 gap-6 font-medium">
                <div className="flex w-full flex-row gap-2">
                    <UserIcon className="h-6 w-6" weight="fill" color="#052e14" />
                   {userData ? <p>{userData.nome}</p> : <Skeleton className="h-6 w-full" /> } 
                </div>
                <div className="flex w-full flex-row gap-2">
                    <AddressBook className="h-6 w-6" weight="fill" color="#052e14" />
                    {userData ? <p>{t(userData.tipo)}</p> : <Skeleton className="h-6 w-full" />}
                </div>

                <div className="flex w-full flex-row gap-2">
                    <Phone className="h-6 w-6" weight="fill" color="#052e14" />
                    {userData ? <p>{formattedPhone}</p> : <Skeleton className="h-6 w-full" />}
                </div>
                <div className="col-span-2 flex w-full flex-row gap-2">
                    <EnvelopeSimple className="h-6 w-6" weight="fill" color="#052e14" />
                    {userData ? <p>{userData.email}</p> : <Skeleton className="h-6 w-2/3" />}
                </div>
            </div>
            <div className="flex h-full w-full flex-row"></div>
        </div>
    );
};
export default UserInformationCard;

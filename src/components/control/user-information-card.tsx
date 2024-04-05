"use client";
import {mockuser} from "@/app/control/page";
import logoRounded from "@/assets/logo-rounded.svg";

import {User, EnvelopeSimple, House, AddressBook, Pencil} from "@phosphor-icons/react";
import EditProfileModal from "./edit-profile-modal";

interface UserInformationCardProps {
    user: mockuser;
}

const UserInformationCard = ({user}: UserInformationCardProps) => {
    return (
        <div className="flex w-full flex-col items-start justify-start gap-4">
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
                    <User className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>{user.name}</p>
                </div>
                <div className="flex w-full flex-row gap-2">
                    <AddressBook className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>{user.tipo}</p>
                </div>

                <div className="flex w-full flex-row gap-2">
                    <House className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>
                        {user.cidade}-{user.estado}
                    </p>
                </div>
                <div className="col-span-2 flex w-full flex-row gap-2">
                    <EnvelopeSimple className="h-6 w-6" weight="fill" color="#052e14" />
                    <p>{user.email}</p>
                </div>
            </div>
            <div className="flex h-full w-full flex-row"></div>
        </div>
    );
};
export default UserInformationCard;

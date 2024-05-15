"use client";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {EnvelopeSimple, CircleNotch} from "@phosphor-icons/react";
import { loginSchema } from "@/utils/validations/loginSchema";
import {PasswordInput} from "@/components/ui/password-input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/components/ui/use-toast";
import {useMutation} from "@tanstack/react-query";
import { useAuth } from "@/utils/hooks/useAuth";
import { useTranslation } from "react-i18next";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import logo2 from "@/assets/logo-row.svg";
import {useForm} from "react-hook-form";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import User from "@/types/user";
import Image from "next/image";
import {z} from "zod";

type Form = z.infer<typeof loginSchema>

const Login = () => {

    const {addUser } = useAuth();


    const {toast} = useToast();

    const {t} = useTranslation();

    const form = useForm<Form>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: "",
            senha: "",
        },
    });

    const {push} = useRouter();

    const getUserRequest = async (postData: Form) => {
        const { data } = await api.post<User>("/login", postData);
        return data;
    };

    const {mutate, isPending} = useMutation({
        mutationFn: getUserRequest,
        onSuccess: (data) => {
                addUser(data);
                    push("/control");
        },
        onError: (error: AxiosError) => {
            const { response } = error;
            if(!response) {
                toast({
                    duration: 1000,
                    variant: "destructive",
                    title: t("network-error"),
                    description: t("network-error-description"),
                });
                return;
            }

            const { status } = response;
            const titleCode = `postLogin-error-${status}`;
            const descriptionCode = `postLogin-description-error-${status}`;

            toast({
                duration: 1000,
                variant: "destructive",
                title: t(titleCode),
                description: t(descriptionCode),
            });
        },
    });



    
    const onHandleSubmit = (data: Form) => {
        mutate(data);
    };


    return (
        <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden text-green-950 ">
            <div className="flex w-[20vw] flex-col items-center justify-center  ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex w-full flex-col gap-6">
                        <Image src={logo2} className="h-[64px] w-auto" alt="Agro Control" width={512} height={512} />
                        <FormField
                            control={form.control}
                            name="login"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            Icon={EnvelopeSimple}
                                            className="min-h-[40px] bg-white transition-colors"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="senha"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="Senha" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                        >
                             { isPending ?  <CircleNotch className="h-5 w-5 animate-spin" /> :  "Entrar"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
export default Login;

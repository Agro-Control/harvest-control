"use client";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {PasswordInput} from "@/components/ui/password-input";
import {EnvelopeSimple} from "@phosphor-icons/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import logo2 from "@/assets/logo-row.svg";
import {useForm} from "react-hook-form";
import Image from "next/image";
import {z} from "zod";

const FormSchema = z.object({
    register: z.string().min(2, {
        message: "Campo obrigatório",
    }),
    password: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
});

const Login = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            register: "",
            password: "",
        },
    });

    const {push} = useRouter();

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        push("/control");
    }

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden text-green-950 ">
            <div className="flex w-[20vw] flex-col items-center justify-center  ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
                        <Image src={logo2} className="h-[64px] w-auto" alt="Agro Control" width={512} height={512} />
                        <FormField
                            control={form.control}
                            name="register"
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
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
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
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
export default Login;

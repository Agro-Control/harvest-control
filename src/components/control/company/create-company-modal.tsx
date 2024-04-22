"use client";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {createCompanySchema} from "@/utils/validations/createCompanySchema";
import {useCreateCompany} from "@/utils/hooks/useCreateCompanies";
import {MaskedInput} from "@/components/ui/masked-input";
import ResponseDialog from "@/components/response-dialog";
import {EnvelopeSimple} from "@phosphor-icons/react";
import {useQueryClient} from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";
import {Input} from "@/components/ui/input";
import {InputMask} from "@react-input/mask";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import Empresa from "@/types/empresa";
import {z} from "zod";
interface CreateCompanyProps {
    children: ReactNode;
}

const CreateCompanyModal = ({children}: CreateCompanyProps) => {
    const queryClient = useQueryClient();

    const {t} = useTranslation();
    const createCompany = useCreateCompany();
    const [open, setOpen] = useState(false);
    const [responseDialogOpen, setResponseDialogOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [responseSuccess, setResponseSuccess] = useState(false);

    const form = useForm<z.infer<typeof createCompanySchema>>({
        resolver: zodResolver(createCompanySchema),
        defaultValues: {
            nome: "",
            cnpj: undefined,
            telefone: "",
            CEP: "",
            estado: "",
            cidade: "",
            bairro: "",
            logradouro: "",
            numero: "",
            complemento: "",
            telefoneResponsavel: "",
            emailResponsavel: "",
            nomeResponsavel: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof createCompanySchema>) => {
        try {
            const empresaData: Empresa = {
                nome: data.nome,
                cnpj: data.cnpj.replace(/\D/g, ""),
                telefone: data.telefone.replace(/\D/g, ""),
                cep: data.CEP.replace(/\D/g, ""),
                estado: data.estado || "",
                cidade: data.cidade || "",
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                status: "A",
                complemento: data.complemento,
                telefone_responsavel: data.telefoneResponsavel.replace(/\D/g, ""),
                email_responsavel: data.emailResponsavel,
                nome_responsavel: data.nomeResponsavel,
                gestor_id: 1,
            };
            const response = await createCompany(empresaData);
            if (response.status === 201 || response.status === 200) {
                setResponseMessage("Empresa criada com sucesso!");
                setResponseSuccess(true);
                await queryClient.refetchQueries({queryKey: ["companies"], type: "active", exact: true});
            } else {
                setResponseMessage("Ocorreu um erro ao criar Empresa.");
                setResponseSuccess(false);
            }
            setResponseDialogOpen(true);
        } catch (error) {
            console.error("Erro ao criar talhao:", error);
            setResponseMessage("Ocorreu um erro ao criar Empresa.");
            setResponseSuccess(false);
            setResponseDialogOpen(true);
        }
    };

    const handleCloseResponseDialog = () => {
        setResponseDialogOpen(false);
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-poppins text-green-950">Criar Empresa</DialogTitle>
                        <DialogDescription>Insira as informações para criar uma empresa.</DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            id="company-form"
                            className="grid grid-cols-2 gap-4 py-4"
                        >
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({field}) => (
                                    <FormItem className="col-span-2">
                                        <FormControl>
                                            <Input id="nome" placeholder="Nome da Empresa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cnpj"
                                render={({field}) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <MaskedInput
                                                {...field}
                                                placeholder="CNPJ"
                                                maskInput={{input: InputMask, mask: "__.___.___/____-__"}}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="telefone"
                                render={({field}) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <MaskedInput
                                                {...field}
                                                Icon={EnvelopeSimple}
                                                placeholder="Telefone da Empresa"
                                                maskInput={{
                                                    input: InputMask,
                                                    mask: "(__) _____-____",
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="CEP"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <MaskedInput
                                                {...field}
                                                placeholder="CEP"
                                                maskInput={{
                                                    input: InputMask,
                                                    mask: "_____-___",
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="estado"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="estado" placeholder={t(field.name)} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cidade"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="cidade" placeholder="Cidade" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bairro"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="bairro" placeholder="Bairro" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="logradouro"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="logradouro" placeholder="Endereço" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numero"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="numero" placeholder="Número" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="complemento"
                                render={({field}) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="complemento" placeholder="Complemento" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nomeResponsavel"
                                render={({field}) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <Input id="nomeResponsavel" placeholder="Nome do Responsável" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emailResponsavel"
                                render={({field}) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <Input
                                                id="emailResponsavel"
                                                placeholder="Email do Responsável"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="telefoneResponsavel"
                                render={({field}) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <MaskedInput
                                                {...field}
                                                placeholder="Telefone do Responsável"
                                                maskInput={{
                                                    input: InputMask,
                                                    mask: "(__) _____-____",
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button
                            type="submit"
                            form="company-form"
                            className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ResponseDialog
                open={responseDialogOpen}
                onClose={handleCloseResponseDialog}
                success={responseSuccess}
                message={responseMessage}
            />
        </>
    );
};
export default CreateCompanyModal;

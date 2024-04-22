"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Unidade from "@/types/unidade";
import { useUpdateUnit } from "@/utils/hooks/useUpdateUnit";
import { editUnitSchema } from "@/utils/validations/editUnitSchema";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useCreateUnit } from "@/utils/hooks/useCreateUnit";
import ResponseDialog from "@/components/response-dialog";


interface createUnitProps {
    children: ReactNode;
}

const CreateUnitModal = ({ children }: createUnitProps) => {
    const createUnit = useCreateUnit();
    const [open, setOpen] = useState(false);
    const [responseDialogOpen, setResponseDialogOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [responseSuccess, setResponseSuccess] = useState(false);

    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(null, null, null);

    const [companyOptions, setCompanyOptions] = useState<{ id: number; nome: string }[]>([]);

    useEffect(() => {
        if (empresas.length > 0) {
            const options = empresas.map((empresa: any) => ({ id: empresa.id, nome: empresa.nome }));
            setCompanyOptions(options);
        }

    }, [empresas]);

    const form = useForm<z.infer<typeof editUnitSchema>>({
        resolver: zodResolver(editUnitSchema),
        defaultValues: {
            nome: "",
            cnpj: "",
            // telefone: unit.telefone,
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            logradouro: "",
            numero: "",
            complemento: "",
            status: "",
            empresa_id: "",
        }
    });




    const onSubmit = async (data: z.infer<typeof editUnitSchema>) => {
        try {
            const unidadeData: Unidade = {
                id: data.id,
                nome: data.nome,
                cnpj: data.cnpj,
                // telefone: data.telefone,
                cep: data.cep,
                estado: data.estado,
                cidade: data.cidade,
                bairro: data.bairro,
                logradouro: data.logradouro,
                numero: data.numero,
                complemento: data.complemento,
                status: data.status,
                gestor_id: 1, //da sessão?
                empresa_id: parseInt(data.empresa_id)
            };
            const response = await createUnit(unidadeData);
            if (response.status === 201 || response.status === 200) {
                setResponseMessage("Empresa atualizada com sucesso!");
                setResponseSuccess(true);
            } else {
                setResponseMessage("Ocorreu um erro ao atualizar a Empresa.");
                setResponseSuccess(false);
            }
            setResponseDialogOpen(true);
        } catch (error) {
            console.error('Erro ao criar talhao:', error);
            setResponseMessage("Ocorreu um erro ao atualizar a Empresa.");
            setResponseSuccess(false);
            setResponseDialogOpen(true);
        }
    }

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
                        <DialogTitle className="font-poppins text-green-950">Criar Unidade</DialogTitle>
                        <DialogDescription>Insira as informações para criar uma Unidade.</DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="company-form" className="grid grid-cols-2 gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormControl>
                                            <Input id="nome" placeholder="Nome da Unidade" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cnpj"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <Input id="cnpj" placeholder="CNPJ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*    <FormField
                            control={form.control}
                            name="telefone"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="telefone" placeholder="Telefone da Empresa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}*/}

                            <FormField
                                control={form.control}
                                name="cep"
                                render={({ field }) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="cep" placeholder="CEP" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="estado"
                                render={({ field }) => (
                                    <FormItem className="col-span-1 ">
                                        <FormControl>
                                            <Input id="estado" placeholder="Estado" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cidade"
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                render={({ field }) => (
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
                                name="empresa_id"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    form.setValue("empresa_id", value);
                                                }}
                                            >
                                                <SelectTrigger className="h-10 w-[180px] ">
                                                    <SelectValue placeholder="Selecione a Empresa" {...field} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {companyOptions.map((company) => (
                                                        <SelectItem key={company.id} value={company.id.toString()}>
                                                            {company.nome}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
export default CreateUnitModal;
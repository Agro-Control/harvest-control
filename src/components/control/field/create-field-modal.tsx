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
import Talhao from "@/types/talhao";
import { editFieldSchema } from "@/utils/validations/editFieldSchema";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useCreateField } from "@/utils/hooks/useCreateField";
import { useTranslation } from "react-i18next";


interface createFieldProps {
    children: ReactNode;
}

const CreateFieldModal = ({ children }: createFieldProps) => {
    const createField = useCreateField();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(null, null, null);

    const [companyOptions, setCompanyOptions] = useState<{ id: number; nome: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ value: string; }[]>([
        { value: 'A' },
        { value: 'I' }
    ]);

    useEffect(() => {
        if (empresas.length > 0) {
            const options = empresas.map((empresa: any) => ({ id: empresa.id, nome: empresa.nome }));
            setCompanyOptions(options);
        }

    }, [empresas]);

    const form = useForm<z.infer<typeof editFieldSchema>>({
        resolver: zodResolver(editFieldSchema),
        defaultValues: {
            id: 0,
            codigo: "",
            tamanho: "",
            status: "",
            empresa_id: "",

        }
    });




    const onSubmit = async (data: z.infer<typeof editFieldSchema>) => {
        try {
            const talhaoData: Talhao = {
                id: null,
                codigo: data.codigo,
                tamanho: data.tamanho,
                empresa_id: parseInt(data.empresa_id),
                status: data.status || "",
                gestor_id: 1, //da sessão?
            };
            createField(talhaoData);
            setOpen(false);
        } catch (error) {
            console.error('Erro ao criar talhao:', error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar Talhao</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma Talhao.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="company-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="codigo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input id="codigo" placeholder="Código" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tamanho"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="tamanho" placeholder="Tamanho" {...field} />
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
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("status", value);
                                            }}
                                        >
                                            <SelectTrigger className="h-10 w-[180px]">
                                                <SelectValue placeholder="Selecione o Status" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {t(option.value)}
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
    );
};
export default CreateFieldModal;
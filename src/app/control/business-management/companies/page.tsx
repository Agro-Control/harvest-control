"use client";
import { fetchDataFromAPI } from "@/app/api/api";
import EditCompanyModal from "@/components/control/company/edit-company-modal";
import CreateUserModal from "@/components/control/create-user-modal";
import EditUserModal from "@/components/control/edit-user-modal";
import Filter from "@/components/control/filter";
import SearchBar from "@/components/control/search-bar";
import ViewUserModal from "@/components/control/view-user-modal";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Company from "@/types/company";
import {Eye, Pencil, Plus} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
interface FilterItem {
    key: string;
    value: string;
}

export interface FilterInformation {
    filterItem: FilterItem[];
    title: string;
}

const statusFilter: FilterInformation = {
    title: "Status",
    filterItem: [
        {key: "Ativo", value: "active"},
        {
            key: "Inativo",
            value: "inactive",
        },
    ],
};
const profileFilter: FilterInformation = {
    title: "Perfil",
    filterItem: [
        {
            key: "Gestor",
            value: "manager",
        },
        {key: "Operador", value: "operator"},
    ],
};



function convertListEmpresasToCompanies(empresas: Empresa[]): Company[] {
    const companies: Company[] = [];
    for (const empresa of empresas) {
      companies.push(convertEmpresaToCompany(empresa));
    }
    return companies;
}
function convertEmpresaToCompany(empresa: Empresa): Company {
    return {
      id: empresa.id,
      name: empresa.nome,
      cnpj: empresa.cnpj,
      phone: empresa.telefone,
      zipCode: empresa.cep,
      state: empresa.estado,
      city: empresa.cidade,
      neighborhood: empresa.bairro,
      adress: empresa.logradouro,
      number: empresa.numero,
      complement: empresa.complemento,
      status: empresa.status,
      creationDate: empresa.data_criacao,
      responsiblePhone: empresa.telefone_responsavel,
      responsibleEmail: empresa.email_responsavel,
      responsibleName: empresa.nome_responsavel,
      managerId: empresa.gestor_id
    };
}

export default function Companies() {
    const [companyList, setCompanyList] = useState<Company[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchDataFromAPI('empresas');
          console.log(data);
          const convertedCompanies = convertListEmpresasToCompanies(data.empresas);
          setCompanyList(convertedCompanies);
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
      };
      fetchData();
    }, []);
    
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Empresas</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} paramType="status" />
                <Filter filter={profileFilter} paramType="profile" />
                <CreateUserModal>
                    <Button
                        type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Criar
                    </Button>
                </CreateUserModal>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>CNPJ</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cidade</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companyList.map((company) => {
                        return (
                            <TableRow key={company.id}>
                                <TableCell className="font-medium">{company.cnpj}</TableCell>
                                <TableCell className="font-medium">{company.name}</TableCell>
                                <TableCell className="font-medium">{company.city}</TableCell>
                                <TableCell className="">{company.state}</TableCell>
                                <TableCell className="">{company.status}</TableCell>
                                <TableCell className="w-28">
                                    <div className="-ml-1 flex w-full flex-row items-center gap-3">
                                      <EditCompanyModal company={company}>
                                            <Pencil
                                                className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                                                weight="fill"
                                            />
                                        </EditCompanyModal>
                                      {/* <ViewCompanyModal companyInformation={company}>
                                            <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                        </ViewCompanyModal>*/}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

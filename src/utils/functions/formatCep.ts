export default function formatCep(cep: string | undefined): string {
    if (!cep) return 'Não informado';
    const cepStr = String(cep).replace(/\D/g, '');
    return `${cepStr.slice(0, 5)}-${cepStr.slice(5, 8)}`;
};

export default function formatCnpj(cnpj: string | undefined): string {
    if (!cnpj) return 'Não informado';
    const cnpjStr = String(cnpj).replace(/\D/g, '');
    return `${cnpjStr.slice(0, 2)}.${cnpjStr.slice(2, 5)}.${cnpjStr.slice(5, 8)}/${cnpjStr.slice(8, 12)}-${cnpjStr.slice(12, 14)}`;
};


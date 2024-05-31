export default function formatCpf(cpf: string | undefined): string {
    if (!cpf) return 'Não informado';
    const cpfStr = String(cpf).replace(/\D/g, '');
    return `${cpfStr.slice(0, 3)}.${cpfStr.slice(3, 6)}.${cpfStr.slice(6, 9)}-${cpfStr.slice(9, 11)}`;
};


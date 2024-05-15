export default function formatPhone(phone: string | undefined): string {
    if (!phone) return 'Não informado';
    const phoneStr = String(phone).replace(/\D/g, '');
    return `(${phoneStr.slice(0, 2)}) ${phoneStr.slice(2, 7)}-${phoneStr.slice(7, 11)}`;
};

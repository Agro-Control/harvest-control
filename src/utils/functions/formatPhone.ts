export default function formatPhone(phone: string | undefined | null): string {
    if (!phone) return '(00) 00000-0000';
    const phoneStr = String(phone).replace(/\D/g, '');
    return `(${phoneStr.slice(0, 2)}) ${phoneStr.slice(2, 7)}-${phoneStr.slice(7, 11)}`;
};

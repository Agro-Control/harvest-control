export default function useFormattedDate(): (dateString: Date | string | undefined) => string {
  return function formatDate(dateString: Date | string | undefined): string {
      if (!dateString || typeof dateString !== 'string') {
          return "-";
      }
    
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
          return "";
      }
    
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
}
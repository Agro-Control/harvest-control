export default function formatDuration(seconds: number | null): string {
    if (seconds != null) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const hoursDisplay = hours > 0 ? `${hours}h` : "";
        const minutesDisplay = minutes > 0 ? `${minutes}m` : "";
        const secondsDisplay = secs > 0 ? `${secs}s` : "";

        if (hours > 0) {
            return `${hoursDisplay} ${minutesDisplay} ${secondsDisplay}`.trim();
        } else if (minutes > 0) {
            return `${minutesDisplay} ${secondsDisplay}`.trim();
        } else {
            return `${secondsDisplay}`;
        }
    }
    return "0s";
}
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface OperationalTimeItemProps {
    title: string;
    description: string;
    value: number;
    color: string;
    total: number;
}

const OperationalTimeItem = ({color, title, description, value, total}: OperationalTimeItemProps) => {

    const percentageValue = Math.round((value / total) * 100);

   




    const formatDuration = (duration: number): string => {
        if (duration === 0) {
            return "0s";
        }

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        const hoursStr = hours > 0 ? `${hours}hr` : "";
        const minutesStr = minutes > 0 ? `${minutes}min  ` : "";
        const secondsStr = seconds > 0 ? ` ${seconds}s` : "";

        return `${hoursStr} ${minutesStr}  ${secondsStr}`.trim();
    };

    return (
        <div className="flex w-full flex-row items-center justify-between px-6">
            <div className="flex flex-row items-center justify-start gap-4">
                <div className="h-14 w-14">
                    <CircularProgressbar
                        strokeWidth={12}
                        value={percentageValue}
                        text={`${percentageValue}%`}
                        styles={{
                            path: {
                                stroke: color,
                            },
                            trail: {},
                            text: {
                                // Text color
                                fill: "#000",
                                // Text size
                                fontSize: "24px",
                                fontWeight: 700,
                            },
                        }}
                    />
                </div>
                <div className="flex  flex-row gap-1 md:flex-col">
                    <div className="flex flex-row items-center gap-2">
                        <div
                            className={`flex min-h-[6px] min-w-[6px] flex-shrink-0 rounded-full`}
                            style={{backgroundColor: color}}
                        />

                        <p
                            className="
                    line-clamp-1
                    text-base
                    font-bold
                    leading-5
                    text-green-950
                    
                    "
                        >
                            {title}
                        </p>
                    </div>
                    <p
                        className="
                        line-clamp-1
                        text-xs
                        font-normal
                        leading-4
                    text-gray-500

                    "
                    >
                        {description}
                    </p>
                </div>
            </div>
            <p className="font-bold">{formatDuration(value)}</p>
        </div>
    );
};
export default OperationalTimeItem;

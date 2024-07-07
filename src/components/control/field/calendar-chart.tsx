import { ResponsiveCalendar } from '@nivo/calendar'

export interface CalendarDatum {
    day: string,
    value: number;
}

export interface MyResponsiveCalendarProps {
    data: CalendarDatum[],
    from: string,
    to: string;

}


export const MyResponsiveCalendar = ({data, from, to} : MyResponsiveCalendarProps ) => (

    <ResponsiveCalendar
        data={data}
        from={"2024-01-02"}
        to={to}
        emptyColor="#eeeeee"
        colors={[ '#05f531', '#1dbf3a', '#258f38', '#1d5c29', '#1f3824']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
)
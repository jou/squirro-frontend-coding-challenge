import { HTMLAttributes } from "react";

import { formatInTimeZone } from "date-fns-tz";

function formatDisplayDate(date: Date, timeZone: string) {
    return formatInTimeZone(date, timeZone, "dd.MM.yyyy");
}

export interface DisplayDateProps {
    date: Date;
    timeZone: string;
}

export function DisplayDate({
    date,
    timeZone,
    ...spanProps
}: DisplayDateProps & HTMLAttributes<HTMLSpanElement>): JSX.Element {
    return <span {...spanProps}>{formatDisplayDate(date, timeZone)}</span>;
}

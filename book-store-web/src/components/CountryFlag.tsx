import { flagFromAlpha2Code } from "~/utils/EmojiFlag";
import { HTMLAttributes } from "react";

export interface CountryFlagProps {
    countryCode: string;
}

export default function CountryFlag({
    countryCode,
    ...spanProps
}: CountryFlagProps & HTMLAttributes<HTMLSpanElement>): JSX.Element {
    return <span {...spanProps}>{flagFromAlpha2Code(countryCode)}</span>;
}

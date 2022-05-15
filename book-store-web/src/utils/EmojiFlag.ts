const CODE_POINT_ASCII_A: number = "A".codePointAt(0) ?? 65;
const CODE_POINT_REGIONAL_INDICATOR_A: number = "🇦".codePointAt(0) ?? 0x1f1e6;
const CODE_POINT_REPLACEMENT_CHARACTER: number = "�".codePointAt(0) ?? 0xfffd;

export function flagFromAlpha2Code(countryCode: string): string {
    if (!countryCode.match(/^[a-z]{2}$/i)) {
        throw new Error("Invalid country code");
    }

    return (
        Array.from(countryCode.toUpperCase())
            // Find the zero-based position of the character in the alphabet
            .map((char) => {
                const codePoint = char.codePointAt(0);
                if (!codePoint) {
                    // In the very
                    return CODE_POINT_REPLACEMENT_CHARACTER;
                }
                return codePoint - CODE_POINT_ASCII_A;
            })
            // Map it to Unicode Regional Indicator Symbol
            .map((alphabeticalPosition) =>
                String.fromCodePoint(
                    CODE_POINT_REGIONAL_INDICATOR_A + alphabeticalPosition,
                ),
            )
            .join("")
    );
}

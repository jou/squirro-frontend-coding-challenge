import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { DisplayDate } from "~/components/DisplayDate";

describe("<DisplayDate>", () => {
    it("should use the date part of the given date", () => {
        const date = new Date("2022-01-31T00:00:00Z");
        const expectedFormattedDate = "31.01.2022";

        const { getByText } = render(
            <DisplayDate date={date} timeZone={"UTC"} />,
        );

        expect(getByText(expectedFormattedDate)).toBeDefined();
    });

    it("should format the date at the given timezone", () => {
        // With a positive UTC offset, 2022-01-31 hasn't started at UTC yet
        const date = new Date("2022-01-31T00:00:00+08:00");
        const expectedFormattedDate = "30.01.2022";

        const { getByText } = render(
            <DisplayDate date={date} timeZone={"UTC"} />,
        );

        expect(getByText(expectedFormattedDate)).toBeDefined();
    });
});

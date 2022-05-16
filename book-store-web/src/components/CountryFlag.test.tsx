import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import CountryFlag from "~/components/CountryFlag";

describe("<CountryFlag>", () => {
    // Not much interesting happening here so far, a snapshot is enough for now
    it("should match snapshot", () => {
        const { container } = render(<CountryFlag countryCode="ch" />);

        expect(container).toMatchSnapshot();
    });
});

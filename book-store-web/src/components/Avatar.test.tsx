import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Avatar } from "~/components/Avatar";

describe("Avatar", () => {
    it("should use the given avatar URL", () => {
        const expectedUrl = "https://example.com/example.jpg";

        const renderResult = render(<Avatar avatarUrl={expectedUrl} />);

        expect(renderResult.container.outerHTML).toMatch(expectedUrl);
    });
});

import { describe, expect, it } from "vitest";
import { flagFromAlpha2Code } from "~/utils/EmojiFlag";

describe("EmojiFlag", () => {
    describe("flagFromAlpha2Code()", () => {
        it("should throw an error with invalid country code", () => {
            expect(() => {
                flagFromAlpha2Code("12");
            }).toThrow();
        });
    });
});

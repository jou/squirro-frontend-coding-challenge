import { describe, expect, it } from "vitest";
import { flagFromAlpha2Code } from "~/utils/EmojiFlag";

describe("EmojiFlag", () => {
    describe("flagFromAlpha2Code()", () => {
        it("should throw on country code with invalid character", () => {
            expect(() => {
                flagFromAlpha2Code("1A");
            }).toThrow();
        });

        it("should throw on country code that is too short", () => {
            expect(() => {
                flagFromAlpha2Code("a");
            }).toThrow();
        });

        it("should throw on country code that is too long", () => {
            expect(() => {
                flagFromAlpha2Code("aaa");
            }).toThrow();
        });

        it("should return the country's flag as an emoji", () => {
            expect(flagFromAlpha2Code("ch")).toEqual("🇨🇭");
        });

        it("should be case insensitive", () => {
            expect(flagFromAlpha2Code("CH")).toEqual(flagFromAlpha2Code("ch"));
        });
    });
});

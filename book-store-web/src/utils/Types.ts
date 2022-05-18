/**
 * Extracts the public properties of a class type. Useful for typing
 * mock objects.
 */
export type PublicOf<T> = {
    [P in keyof T]: T[P];
};

/**
 * Lie to TypeScript and convince it that the given value is of a type,
 * bypassing the type checker. TypeScript does not get to make a saving throw.
 *
 * WARNING: The only place you should ever use this are tests.
 */
export function forceCast<T>(value: unknown): T {
    return value as T;
}

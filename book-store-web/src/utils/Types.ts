/**
 * Extracts the public properties of a class type. Useful for typing
 * mock objects.
 */
export type PublicOf<T> = {
    [P in keyof T]: T[P];
};

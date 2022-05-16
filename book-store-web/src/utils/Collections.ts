export interface Identifiable<KeyType> {
    id: KeyType;
}

function ensureArray<T>(val: Iterable<T>): T[] {
    if (Array.isArray(val)) {
        return val;
    }
    return Array.from(val);
}

export function getById<KeyType, ValueType extends Identifiable<KeyType>>(
    collection: Iterable<ValueType>,
    key: KeyType,
    required: true,
): ValueType;
export function getById<KeyType, ValueType extends Identifiable<KeyType>>(
    collection: Iterable<ValueType>,
    key: KeyType,
): ValueType | undefined;
export function getById<KeyType, ValueType extends Identifiable<KeyType>>(
    collection: Iterable<ValueType>,
    key: KeyType,
    required: boolean = false,
): ValueType | undefined {
    const item = ensureArray(collection).find((item) => {
        return item.id === key;
    });
    if (!item && required) {
        throw new Error(`Item with ID ${key} not found`);
    }

    return item;
}

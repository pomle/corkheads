type Container<T> = {
    id: string,
    data: T,
};

export type Article = Container<{
    displayName: string,
    manufacturer: string;
}>;

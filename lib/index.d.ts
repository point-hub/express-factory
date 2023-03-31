export { faker } from "@faker-js/faker";
export default abstract class Factory<T> {
    modelCount: number;
    modelSequence: Array<Partial<T>>;
    modelState: Partial<T>;
    abstract definition(): T;
    abstract create(): Promise<unknown>;
    abstract createMany(count: number): Promise<unknown>;
    count(modelCount: number): this;
    sequence(modelSequence: Array<Partial<T>>): this;
    state(modelState: Partial<T>): this;
    useSequence(): Array<T>;
    useState(obj: T): T;
    make(count?: number): T | T[];
    makeOne(): T;
    makeMany(count: number): T[];
}

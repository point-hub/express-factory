interface LooseObject {
    [key: string]: unknown;
}
export default abstract class Factory {
    modelCount: number;
    modelSequence: Array<object>;
    modelState: object;
    modelCreate: (data: object) => void;
    abstract definition(): LooseObject;
    abstract create(obj: LooseObject): unknown;
    abstract createMany(obj: Array<LooseObject>): unknown;
    count(modelCount: number): this;
    sequence(modelSequence: Array<object>): this;
    state(modelState: object): this;
    useSequence(): Array<LooseObject>;
    useState(obj: LooseObject): LooseObject;
    makeOne(): LooseObject;
    makeMany(count?: number): Array<LooseObject>;
}
export {};

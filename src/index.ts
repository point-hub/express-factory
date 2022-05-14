export default abstract class Factory<T, PartialT extends Partial<T>> {
  modelCount = 1;
  modelSequence: Array<PartialT> = [];
  modelState: PartialT = {} as PartialT;

  abstract definition(): T;

  abstract create(): Promise<unknown>;

  abstract createMany(count: number): Promise<unknown>;

  count(modelCount: number) {
    this.modelCount = modelCount;
    return this;
  }

  sequence(modelSequence: Array<PartialT>) {
    this.modelSequence = modelSequence;
    return this;
  }

  state(modelState: PartialT) {
    this.modelState = modelState;
    return this;
  }

  useSequence(): Array<T> {
    const data: Array<T> = [];

    for (let i = 0; i < this.modelCount; i++) {
      const payload = this.definition();

      let sequence = {};
      if (this.modelSequence.length) {
        sequence = this.modelSequence[i % this.modelSequence.length];
      }

      data.push({
        ...this.useState({
          ...payload,
          ...sequence,
        }),
      });
    }

    return data;
  }

  useState(obj: T): T {
    return {
      ...obj,
      ...this.modelState,
    };
  }

  makeOne(): T {
    return this.useState(this.definition());
  }

  makeMany(count = 3): T[] {
    return this.count(count).useSequence();
  }
}

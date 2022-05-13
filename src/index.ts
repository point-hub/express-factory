export default abstract class Factory<M extends object, S extends object> {
  modelCount = 1;
  modelSequence: Array<S> = [];
  modelState: S = {} as S;

  abstract definition(): M;

  abstract create(): unknown;

  abstract createMany(count: number): unknown;

  count(modelCount: number) {
    this.modelCount = modelCount;
    return this;
  }

  sequence(modelSequence: Array<S>) {
    this.modelSequence = modelSequence;
    return this;
  }

  state(modelState: S) {
    this.modelState = modelState;
    return this;
  }

  useSequence(): Array<M> {
    const data: Array<M> = [];

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

  useState(obj: M): M {
    return {
      ...obj,
      ...this.modelState,
    };
  }

  makeOne() {
    return this.useState(this.definition());
  }

  makeMany(count?: number): Array<M> {
    if (count) {
      this.count(count);
    }

    return this.useSequence();
  }
}

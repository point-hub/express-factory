interface LooseObject {
  [key: string]: unknown;
}

export default abstract class Factory {
  modelCount = 1;
  modelSequence: Array<object> = [];
  modelState: object = {};
  modelCreate!: (data: object) => void;

  abstract definition(): LooseObject;

  abstract create(): unknown;

  abstract createMany(count: number): unknown;

  count(modelCount: number) {
    this.modelCount = modelCount;
    return this;
  }

  sequence(modelSequence: Array<object>) {
    this.modelSequence = modelSequence;
    return this;
  }

  state(modelState: object) {
    this.modelState = modelState;
    return this;
  }

  useSequence(): Array<LooseObject> {
    const data = [];
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

  useState(obj: LooseObject): LooseObject {
    return {
      ...obj,
      ...this.modelState,
    };
  }

  makeOne(): LooseObject {
    return this.useState(this.definition());
  }

  makeMany(count?: number): Array<LooseObject> {
    if (count) {
      this.count(count);
    }

    return this.useSequence();
  }
}

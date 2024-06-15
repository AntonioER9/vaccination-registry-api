export abstract class MockModel<T> {
  protected abstract entityStub: T;

  findOne(): T {
    return this.entityStub;
  }

  findAll(): T[] {
    return this.entityStub ? [this.entityStub] : [];
  }

  find(): T[] {
    return this.entityStub ? [this.entityStub] : [];
  }
}

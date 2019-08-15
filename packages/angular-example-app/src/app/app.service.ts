import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {
  get name() {
    return this.value;
  }
  constructor(@Inject('str') public value: string) {}

  logServiceName() {
    console.log(`Service name is ${this.name}`);
  }
}

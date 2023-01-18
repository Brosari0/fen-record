import { FenRecord } from "./fen-record";

const fen = new FenRecord();

class Car {
  _miles!: number
  get miles(): number {
    return this._miles
  }

  set miles(value) {
    throw new Error()
    this._miles = value;
  }
}

const car = new Car();
car.miles = 190000;
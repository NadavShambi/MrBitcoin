import { Transfer } from "./transfer";

export class Contact {
  constructor(
    public _id?: string,
    public name: string = '',
    public email: string = '',
    public phone: string = '',
    public coins: number = 100,
    public moves: Transfer[] = []
  ) {}

  setId?(id: string = 'r101') {
    // Implement your own set Id
    this._id = id;
  }
}

export interface ContactFilter {
  term: string;
}

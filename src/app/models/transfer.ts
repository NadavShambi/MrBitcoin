export class Transfer {
  constructor(
    public amount: number,
    public from: string,
    public to: string,
    public _id: string,
    public at: Date = new Date()
  ) {}
}

export class AddProduct {
    static readonly type = '[Product] Add';
    constructor(public name: string, public price: number) {}
  }
  
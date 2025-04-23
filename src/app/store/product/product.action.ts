export class AddProduct {
    static readonly type = '[Product] Add';
    constructor(public name: string, public price: number) {}
  }
  

  export class AddBulkProducts {
    static readonly type = '[Product] Add Bulk';
    constructor(public products: { name: string; price: number }[]) {}
  }

  
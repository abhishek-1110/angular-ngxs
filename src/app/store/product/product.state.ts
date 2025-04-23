import { State, Action, StateContext } from '@ngxs/store';
import { AddProduct, AddBulkProducts, SetProductsFromDb } from './product.action';

export interface Product {
  name: string;
  price: number;
}

export interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
  },
})
export class ProductState {
  //   @Action(AddProduct)
  //   addProduct(ctx: StateContext<ProductStateModel>, action: AddProduct) {
  //     const state = ctx.getState();
  //     ctx.setState({
  //       products: [...state.products, { name: action.name, price: action.price }],
  //     });
  //   }

  @Action(AddBulkProducts)
  addBulkProducts(
    ctx: StateContext<ProductStateModel>,
    action: AddBulkProducts
  ) {
    const state = ctx.getState();
    ctx.setState({
      products: [...state.products, ...action.products],
    });
  }



@Action(SetProductsFromDb)
setFromDb(ctx: StateContext<ProductStateModel>, action: SetProductsFromDb) {
  ctx.setState({ products: [...action.products] });
}

}
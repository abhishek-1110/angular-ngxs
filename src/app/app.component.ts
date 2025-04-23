import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetUser } from 'src/app/store/user/user.action';
import { AddProduct, SetProductsFromDb } from 'src/app/store/product/product.action';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserStateModel } from 'src/app/store/user/user.state';
import { ProductStateModel } from 'src/app/store/product/product.state';
import { AddBulkProducts } from 'src/app/store/product/product.action';
import { IndexedDbService } from './services/indexed-db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-angular-app';

  constructor(private db: IndexedDbService, private store: Store) {}

  @Select((state: { user: UserStateModel }) => state.user)
  user$!: Observable<UserStateModel>;
  @Select((state: { product: ProductStateModel }) => state.product.products)
  products$!: Observable<any[]>;

  setUser() {
    debugger;
    this.store.dispatch(new SetUser('John Doe', 'john@example.com'));
  }

  addProduct() {
    this.store.dispatch(new AddProduct('Laptop', 1200));
  }

  // generateBigProductData() {
  //   const bigData: { name: string; price: number }[] = [];
  //   const productCount = 500_000; // Adjust based on average object size to get ~50 MB

  //   for (let i = 0; i < productCount; i++) {
  //     bigData.push({
  //       name: `Product ${i}`,
  //       price: Math.round(Math.random() * 1000),
  //     });
  //   }

  //   console.trace('Generated', bigData.length, 'products');

  //   this.store.dispatch(new AddBulkProducts(bigData));
  // }


  async ngOnInit() {
    const products = await this.db.loadProducts();
    this.store.dispatch(new SetProductsFromDb(products));
  }

  // set it into indexed db
  generateBigProductData() {
    const bigData: { name: string; price: number }[] = [];
  
    for (let i = 0; i < 500_000; i++) {
      bigData.push({
        name: `Product ${i}`,
        price: Math.round(Math.random() * 1000)
      });
    }
  
    this.db.saveProducts(bigData).then(() => {
      this.store.dispatch(new SetProductsFromDb(bigData));
      console.log('Products saved to IndexedDB and NGXS store');
    });
  }
  


}

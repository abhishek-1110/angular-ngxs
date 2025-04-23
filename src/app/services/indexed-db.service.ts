import { Injectable } from '@angular/core';
import { openDB } from 'idb';

const DB_NAME = 'MyAppDB';
const STORE_NAME = 'products';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });

  async saveProducts(products: any[]) {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, products, 'all');
  }

  async loadProducts(): Promise<any[]> {
    const db = await this.dbPromise;
    return (await db.get(STORE_NAME, 'all')) || [];
  }

  async clearProducts() {
    const db = await this.dbPromise;
    await db.delete(STORE_NAME, 'all');
  }
}

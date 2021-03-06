// https://github.com/Jackyzm/react-app-ts/blob/master/src/stores/List/FakeList.ts
import { observable, action, computed, autorun } from 'mobx';
import { ProductModel, CartItemModel } from 'app/models';
// import { getCatalogList } from '../utils/api';
import * as _ from 'lodash';

export class CartStore {
  @observable cartItems = observable.map();
  @observable loading = false;

  @computed
  get count() {
    return this.cartItems.size;
  }

  @computed
  get subTotal() {
    let cartItem = this.cartItems.values();
    let subtotal = _.sumBy(cartItem, 'item.price');
    return subtotal.toFixed(2);
  }

  @action addToCart = (product) => {
    let cartItem;
    const { id } = product;
    const { name } = product;
    if (this.cartItems.has(id)) {
      cartItem = this.cartItems.get(id);
      cartItem.incQty();
    } else {
      this.cartItems.set(name, new CartItemModel(product));
    }
  };

  @action removeFromCart = (id) => {
    this.cartItems.delete(id);
  };
  @action clearCart = () => {
    this.cartItems.clear;
  };
}

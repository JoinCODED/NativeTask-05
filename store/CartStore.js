import { decorate, observable, action, computed } from "mobx";

class CartStore {
  constructor() {
    this.list = [];
  }

  addItemToCart(item) {
    const index = this.list.findIndex(
      cartItem => cartItem.drink == item.drink && cartItem.option == item.option
    );
    if (index >= 0) {
      this.list[index].quantity++;
    } else {
      this.list.push(item);
    }
  }

  removeItemFromCart(item) {
    this.list = this.list.filter(cartItem => cartItem !== item);
  }

  checkoutCart() {
    this.list = [];
  }
  get quantity() {
    let quantity = 0;
    this.list.forEach(item => (quantity = quantity + item.quantity));
    return quantity;
  }
}

decorate(CartStore, {
  list: observable,
  addItemToCart: action,
  removeItemFromCart: action,
  checkoutCart: action,
  quantity: computed
});

export default new CartStore();

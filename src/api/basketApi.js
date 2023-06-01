import {$authHost} from './index';

const basketApi = {
  toCart(id) {
    return $authHost.post('basket/add/' + id).then((res) => res.data);
  },
  getProducts() {
    return $authHost.get('basket').then((res) => res.data);
  },
  removeProduct(id) {
    return $authHost.delete('basket/' + id).then((res) => res.data);
  },
  createOrder(order, email) {
    return $authHost.post('basket/order', {
      email,
      order
    }).then((res) => res.data);
  }
}

export default basketApi;
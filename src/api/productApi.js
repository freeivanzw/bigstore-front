import {$authHost, $host} from './index';

const productApi = {
  getAll(page, limit, TypeId, BrandId) {

    let typeUrl = '';
    let brandUrl = '';

    if (TypeId) {
      typeUrl = TypeId.map((type) => `&TypeId=${type}`).join('')
    }

    if (BrandId) {
      brandUrl = BrandId.map((brand) => `&BrandId=${brand}`).join('')
    }

    return $host.get(`device?page=${page ? page : ''}&limit=${limit}${typeUrl}${brandUrl}`).then((res) => res.data);
  },
  getById(id) {
    return $host.get(`device/${id}`).then((res) => res.data)
  },
  create(product) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('image', product.image);
    formData.append('BrandId', product.BrandId);
    formData.append('TypeId', product.TypeId);
    formData.append('rating', 0);
    formData.append('infoList', JSON.stringify(product.infoList))
    return $authHost.post('device', formData).then((res) => res.data);
  },
  remove(id) {
    return $authHost.delete('device/' + id).then((res) => res.data);
  },
}

export default productApi;
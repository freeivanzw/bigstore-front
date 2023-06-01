import {$authHost, $host} from './index';

const BrandApi = {
  getAll() {
    return $host.get('brand').then((res) => res.data);
  },
  create(name) {
    return $authHost.post('brand', {name}).then((res) => res.data);
  },
  remove(id) {
    return $authHost.delete('brand?id=' + id).then((res) => res.data);
  }
}

export default BrandApi;
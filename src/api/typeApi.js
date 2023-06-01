import {$authHost, $host} from './index';

const TypeApi = {
  getAll() {
    return $host.get('type').then((res) => res.data);
  },
  create(name) {
    return $authHost.post('type', {
      name
    }).then((res) => res.data);
  },
  remove(id) {
    return $authHost.delete('type?id=' + id).then((res) => res.data);
  }
}

export default TypeApi;
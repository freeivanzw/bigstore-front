import {$authHost, $host} from './index';

const userApi = {
  register(name, email, password) {
    return $host.post('user/register', {
      name,
      email,
      password
    }).then((res) => res.data)
  },
  login(email, password) {
    return $host.post('user/login', {
      email,
      password
    }).then((res) => res.data)
  },
  edit(name, email, password) {
    return $authHost.post('user/edit', {
      name,
      email,
      password
    }).then((res) => res.data)
  },
  auth() {
    return $authHost.get('user/auth').then((res) => res.data)
  },
}

export default userApi;
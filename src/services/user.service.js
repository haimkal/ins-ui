import Cookies from 'js-cookie';
import environment from '../environments/index';
export class UserService {
    
    static getToken(){
      return Cookies.get('nechavot-user');
    }
    static async me() {
            const res = await fetch(environment.apiUrl + '/user/me', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
                Authorization: UserService.getToken()
              },
            });
              if (res.status !== 200) {
                return null;
              }
              const user = await res.json();
              console.log(user);
              return user;
            }
            
    static create (values) {
      return fetch(environment.apiUrl + '/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
  }

    static  login (values) {
      return fetch(environment.apiUrl + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
  }
}

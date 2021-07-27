import Cookies from 'js-cookie';

export class UserService {
    
    static getToken(){
      return Cookies.get('nechavot-user');
    }
    static async me() {
            const res = await fetch('http://localhost:4000/user/me', {
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
      return fetch('http://localhost:4000/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
  }

    static  login (values) {
      return fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
  }
}

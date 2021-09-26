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

    static login (values) {
      return fetch(environment.apiUrl + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
  }

  static async getPosts(username) {
        
        const res = await fetch(environment.apiUrl + '/user/' + username + '/posts', {     
          headers: {
            Authorization: UserService.getToken()
          },
      });
        const posts = await res.json();
        return posts;
  }

  static async getUser(username) {
        
    const res = await fetch(environment.apiUrl + '/user/' + username, {     
      headers: {
        Authorization: UserService.getToken()
      },
  });
    const user = await res.json();
    return user;
}

  static async editUser (values, userId) {
    const data = new FormData();
    if(values.image) {
      data.append('image', values.image);
    }
    data.append('username', values.username);
    data.append('email', values.email);
    console.log(data);
    const res = fetch(environment.apiUrl + `/user/edit/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: UserService.getToken()
      },
      body: data
    });
    return res;
  }
   
}

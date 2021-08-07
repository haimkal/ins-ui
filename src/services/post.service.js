import { UserService } from "./user.service";
import environment from '../environments/index';
export class PostService {

    static feed() {
        return fetch(environment.apiUrl + '/post', {
            headers: {
                Authorization: UserService.getToken()
            }
        }).then(res => res.json());
    }

    static async get(id) {
        try {
            const res = await fetch(environment.apiUrl + '/post/' + id, {
                headers: {
                    Authorization: UserService.getToken() 
                }
            });
            const result = await res.json();
            return result;
        } catch(err) {
            console.log(err);
        }
    }
   

}
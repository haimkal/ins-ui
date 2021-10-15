import { UserService } from "./user.service";
import environment from '../environments/index';
export class PostService {

    static feed() {
        return fetch(environment.apiUrl + '/post?sort=-1', {
            headers: {
                Authorization: UserService.getToken()
            }
        }).then(res => res.json());
    }

    static async get(id) {
            const res = await fetch(environment.apiUrl + '/post/' + id, {
                headers: {
                    Authorization: UserService.getToken() 
                }
            });
            const result = await res.json();
            return result;
       
    }

   
    static async takenByMe(id, myUsername){
        const res = await fetch(environment.apiUrl + `/post/taken/${id}/${myUsername}`, {
            // method: 'POST',
            headers: {
                Authorization: UserService.getToken()
            },
            
            
        });
        
        const result = await res.json();
        console.log(result);
        return result;
    }
}
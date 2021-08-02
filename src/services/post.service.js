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
}
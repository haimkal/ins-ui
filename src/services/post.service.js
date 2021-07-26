import { UserService } from "./user.service";

export class PostService {

    static feed() {
        return fetch('http://localhost:4000/post', {
            headers: {
                Authorization: UserService.getToken()
            }
        }).then(res => res.json());
    }
}
import React, {useContext} from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { UserContext } from '../../user-context';
import { Link } from 'react-router-dom';
import './HeaderAvatar.scss';

export default function HeaderAvatar() {

    const { user } = useContext(UserContext);
    return (
        <div className="HeaderAvatar"> 
            <Link to = {`/profile/${user.username}`} >
                <Avatar size="md" image={user.avatar} />
                <span className="HeaderAvatar__username mx-2 d-none d-sm-block">{user.username}</span>
            </Link>  
        </div>
    )
}

import React, {useContext} from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { UserContext } from '../../user-context';
import './HeaderAvatar.scss';

export default function HeaderAvatar() {

    const { user } = useContext(UserContext);
    return (
        <div className="HeaderAvatar"> 
            <Avatar size="md" image={user.avatar} />
            <span className="d-none d-sm-block">{user.username}</span>
        </div>
    )
}

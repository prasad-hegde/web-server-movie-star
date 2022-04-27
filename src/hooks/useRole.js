import {ReactSession} from 'react-client-session';


export default function useRole() {
    const user = ReactSession.get('user');
    return user.role;
}
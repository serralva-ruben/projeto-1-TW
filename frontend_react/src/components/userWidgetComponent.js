import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import styles from '../style/style';
import UserContext from '../UserContext';

const UserWidgetComponent = () => { 
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser) setUser(JSON.parse(storedUser))
        else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user')
            navigate('/Login')
        }

        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
      },[]);

    return (
        <div style={styles.userWidget}>
            <div>Welcome back {user ? user.username: 'undefined'}</div>
            <div>{time}</div>
        </div>
    );
}

export default UserWidgetComponent;

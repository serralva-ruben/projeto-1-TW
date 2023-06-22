import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import styles from '../style/style';
import UserContext from '../UserContext';

const UserWidgetComponent = () => { 
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [image, setImage] = useState('');

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser) setUser(JSON.parse(storedUser))
        else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user')
            navigate('/Login')
        }

        const timer = setInterval(() => {
            const currentTime = new Date();
            setTime(currentTime.toLocaleTimeString());
            const currentHour = currentTime.getHours();
            if (currentHour >= 5 && currentHour < 12) {
                setImage("/media/widgetBackgrounds/morning.jpg");
            } else if (currentHour >= 12 && currentHour < 18) {
                setImage("/media/widgetBackgrounds/afternoon.jpg");
            } else {
                setImage("/media/widgetBackgrounds/night.jpg");
            }
        }, 1000);
        return () => clearInterval(timer);
    },[]);

    
    const userWidgetStyle = {
        ...styles.userWidget,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div style={userWidgetStyle}>
            <div>Welcome back {user ? user.username: 'undefined'}</div>
            <div>{time}</div>
        </div>
    );
}


export default UserWidgetComponent;

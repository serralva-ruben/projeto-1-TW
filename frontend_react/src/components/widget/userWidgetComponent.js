import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import styles from '../../style/style';
import UserContext from '../../UserContext';
import ScoresGraph from './ScoreGraph';

const UserWidgetComponent = () => { 
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [image, setImage] = useState('');

    useEffect(()=>{
        const fetchDataAndUpdateLocalStorage = async () => {
            try {
                const usernameLocalStorage = JSON.parse(localStorage.getItem('user')).username;
                const userResponse = await fetch(`http://localhost:8020/api/users/${usernameLocalStorage}`);
                const userData = await userResponse.json();
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (error) {console.error(error);}
        };
        fetchDataAndUpdateLocalStorage();
        const storedUser = localStorage.getItem('user');
        if(!storedUser)
        {
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

    const scoreGraph = {
        ...styles.scoresGraph,
    };

    return (
        <div style={userWidgetStyle}>
            <div style={styles.userWidgetContainer}>
                <div>Welcome back {user ? user.username: 'undefined'}</div>
                <div>{time}</div>
            </div>
            <div style={scoreGraph}>
                {user && (<ScoresGraph scores={user.scores} width={300} height={150}/>)}
            </div>
            
        </div>
    );
}


export default UserWidgetComponent;

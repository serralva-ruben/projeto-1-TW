import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"
import '../../style/Widget.css'
import UserContext from '../../UserContext';
import ScoresGraph from './ScoreGraph';

const UserWidgetComponent = () => { 
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [image, setImage] = useState('');
    const [graphWidth, setGraphWidth] = useState(window.innerWidth * 0.85);
    
    useEffect(()=>{
        const fetchDataAndUpdateLocalStorage = async () => {
            try {
                const token = localStorage.getItem('jwt')
                const usernameLocalStorage = JSON.parse(localStorage.getItem('user')).username;
                const userResponse = await fetch(`http://localhost:8020/api/users/${usernameLocalStorage}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
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
            } else if (currentHour >= 12 && currentHour < 20) {
                setImage("/media/widgetBackgrounds/afternoon.jpg");
            } else {
                setImage("/media/widgetBackgrounds/night.jpg");
            }
        }, 1000);

        window.addEventListener('resize', handleResize);

        function handleResize() {setGraphWidth(window.innerWidth * 0.85)}
        
        return () => {
            window.removeEventListener('resize', handleResize)
            clearInterval(timer)
        };
    },[]);

    
    const userWidgetStyle = {
        backgroundImage: `url(${image})`,
    };

    return (
        <div style={userWidgetStyle} id='userWidget' >
            <div id='userWidgetContainer' >
                <div>Welcome back {user ? user.username: 'undefined'}</div>
                <div>{time}</div>
            </div>
            <div id='scoresGraph' >
                {user && (<ScoresGraph scores={user.scores} width={graphWidth} height={90}/>)}
            </div>
            
        </div>
    );
}


export default UserWidgetComponent;
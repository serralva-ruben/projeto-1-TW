import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../../style/style';
import UserContext from '../../UserContext';
import ScoresGraph from './ScoreGraph';

const UserWidgetComponent = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [image, setImage] = useState('');
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const fetchDataAndUpdateLocalStorage = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const usernameLocalStorage = JSON.parse(localStorage.getItem('user')).username;
                const userResponse = await fetch(`http://localhost:8020/api/users/${usernameLocalStorage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = await userResponse.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataAndUpdateLocalStorage();

        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            navigate('/Login');
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

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(timer);
        };
    }, []);

    const userWidgetStyle = {
        ...styles.userWidget,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'row',
        alignItems: 'center',
    };

    const timeStyle = {
        flex: '1',
    };

    const scoreGraphStyle = {
        ...styles.scoresGraph,
        marginTop: '1rem',
    };

    const graphWidth = windowSize.width < 768 ? windowSize.width * 0.8 : 300;
    const graphHeight = windowSize.width < 768 ? graphWidth * 0.5 : 150;

    return (
        <div style={userWidgetStyle}>
            <div style={styles.userWidgetContainer}>
                <div>
                    Welcome back {user ? user.username : 'undefined'}
                </div>
                <div style={timeStyle}>{time}</div>
            </div>
            <div style={scoreGraphStyle}>
                {user && <ScoresGraph scores={user.scores} width={graphWidth} height={graphHeight} />}
            </div>
        </div>
    );
}

export default UserWidgetComponent;
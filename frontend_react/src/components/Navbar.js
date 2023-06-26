import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import '../style/Navbar.css'


function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        navigate('/Login');
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        else logout();
    }, []);

    return (
        <div id='navBarContainer'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" id='homeButton'><img id='homeImg' alt="Home" />Home</Link>
                <img src='/media/navbaricons/UAC_logo.png' alt="UAC Logo" id='logo' /> {/* University logo */}

            </div>
            {user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={styles.userBadge} id='userBadge'>{user.username.charAt(0).toUpperCase()}</div>
                    <button onClick={logout} id='logoutButton'><img id='logoutImg' src='/media/navbaricons/power-off.png' alt="Logout" />Logout</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const styles = {
    userBadge: {
        backgroundColor: getRandomColor(),
    }
};


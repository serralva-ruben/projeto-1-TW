import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import styles from '../style/style';


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
        <div style={styles.navBarContainer}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={styles.homeButton}><img style={styles.homeImg} src = '/media/navbaricons/home.png' alt = "Home"/>Home</Link>
                <img src= '/media/navbaricons/UAC_logo.png' alt="UAC Logo" style={styles.logo} /> {/* University logo */}
                
            </div>
            {user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={styles.userBadge}>{user.username.charAt(0).toUpperCase()}</div>
                    <button onClick={logout} style={styles.logoutButton}><img style={styles.logoutImg} src = '/media/navbaricons/power-off.png' alt = "Logout"/>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;

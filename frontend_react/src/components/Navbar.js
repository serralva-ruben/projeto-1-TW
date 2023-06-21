import React, {useContext, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom"
import UserContext from '../UserContext'
import styles from '../style/style';

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user')
        navigate('/Login')
    }
    useEffect(()=>{
      const storedUser = localStorage.getItem('user');
      if(storedUser) setUser(JSON.parse(storedUser))
      else logout();
    },[]);

    return (
        <div style={styles.navBarContainer}>
            <ul style={styles.list}>
                <Link to="/" style={styles.Typography}>
                    Home
                </Link>
            </ul>
            {user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={styles.userBadge}>{user.username.charAt(0).toUpperCase()}</div>
                    <button onClick={logout} style={styles.Typography}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
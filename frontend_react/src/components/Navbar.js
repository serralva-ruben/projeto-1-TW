import React from 'react';
import { Link, useNavigate } from "react-router-dom"


function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwt');
        navigate('/Login')
    }

    return (
        <div style={styles.navBarContainer}>
            <ul style={styles.list}>
                <Link to="/" style={styles.Typography}> Home </Link>
                <button onClick={logout} style={styles.Typography}>logout</button>
            </ul>
        </div>
    );
}


export default Navbar;



const styles = {
    navBarContainer: {
      fontSize: "30px",
      backgroundColor: "#cee0c1",
      borderRadius: "5px",
      borderStyle: "solid",
      borderWidth: "2px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    },
    list: {
      listStyle: "none",
      padding: "0",
      display: "flex",
      gap: "2rem",
      alignItems: "center",
    },
  
    Typography: {
      marginLeft: "15px",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#fff",
      backgroundColor: "#3498db",
      border: "none",
      borderRadius: "50px",
      padding: "5px 24px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    },
  };
  
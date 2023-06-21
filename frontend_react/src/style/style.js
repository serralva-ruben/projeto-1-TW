const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const styles = {
    formStyle: {
        marginInline: '5vw',
        padding: '5vw',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: '15px'
    },
    question: {
        borderColor: 'black',
        borderStyle: 'solid',
        padding: '5vw',
        margin: '2vh'
    },
    img: {
        width: '20vw',
        height: '20vw',
        objectFit: 'cover',
        borderRadius: '15%',
        borderColor: 'Black',
        borderWidth: '3px',
        borderStyle:'solid',
        marginLeft: '30vw',
        marginRight: '2vw'
    },
    
    menuText: {
        textDecoration: 'none',
        color: '#212121',
        fontSize: '1em',
        fontWeight: 'bold',
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    },
    userBadge: {
        height: '4rem',
        aspectRatio: '1/1',
        marginRight: '1vw',
        backgroundColor: getRandomColor(),
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    },
    navBarContainer: {
        marginTop: '0.2vw',
        marginLeft: '0.2vw',
        marginRight: '0.2vw',
        fontSize: "30px",
        backgroundColor: "#cee0c1",
        borderRadius: "5px",
        borderStyle: "solid",
        borderWidth: '2px',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: '0 20px',
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
        backgroundColor: "#7695dd",
        border: "none",
        borderRadius: "5px",
        padding: "5px 24px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    },
    userWidget: {
        color: '#000000',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#7d93e8',
        border: '#282c34 solid 2px',
        height: '10rem',
        margin: '1rem',
        marginInline: '2rem',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}

export default styles
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
        margin: '1rem',
        overflowY: 'auto',
    },
    userBadge: {
        backgroundColor: getRandomColor(),
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
        color: 'white',
        padding: '1rem',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        fontSize: '1.8rem',
        textShadow: '2px 2px 4px #000000',
        backgroundColor: '#7d93e8',
        border: '#282c34 solid 2px',
        height: '10rem',
        margin: '1rem',
        marginInline: '2rem',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    summaryContainer: {
        width: '80vw',
        height: '80vh'
    },
    summaryItems: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto',
        overflowY: 'auto',
        justifyContent: 'center',
    },
    summaryItemCorrect: {
        margin: '2rem',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        padding: '10px',
        backgroundColor: 'green',
        aspectRatio: '1',
        height: '2rem',

    },
    summaryItemFalse: {
        margin: '2rem',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        padding: '10px',
        backgroundColor: 'red',
        aspectRatio: '1',
        height: '2rem',
    },
    summaryButton: {
        marginBottom: '0',
        backgroundColor: 'lightblue',
        borderColor: 'black',
        borderRadius: '5px',
        padding: '10px',
        textDecoration: 'none',

    },
    userWidgetContainer: {
        display: 'block',
        justifyContent: 'space-between'
    },
    scoresGraph: {
        marginTop: '-2rem',
    },
    img: {
        width: '20vw',
        aspectRatio: '1',
        objectFit: 'cover',
    },

}

export default styles
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ScoresGraph = ({ scores, width, height }) => {
    const scoresWithNumbers = scores.map(score => ({
        ...score, score: parseFloat(score.score.$numberDecimal)*100,
    }));
    console.log(scoresWithNumbers)

    return (
        <LineChart
            width={width}
            height={height}
            data={scoresWithNumbers}
            style={{ background: 'rgba(255, 255, 255, 0.2)' }} // Set background color to white
        >
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="quizTitle" tick={{ fontSize: 12, fill: '#ffffff' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 16, fill: '#ffffff' }} />
            <Line type="monotone" dataKey="score" stroke="#007bff" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default ScoresGraph;

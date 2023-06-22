import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ScoresGraph = ({ scores, width, height }) => {
    return (
      <LineChart
        width={width}
        height={height}
        data={scores}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="quizTitle" />
        <YAxis />
        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  };
  
  export default ScoresGraph;
import React, { useContext } from 'react';
import UserContext from '../UserContext';
import Navbar from "./Navbar";


const UserBadge = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <Navbar />
            <h1>User Badge</h1>
            <div>
                <h2>User Attempts</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Score</th>
                        <th>Date and Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.scores.map((attempt) => (
                        <tr key={attempt._id.$oid}>
                            <td>{attempt.quizTitle}</td>
                            <td>{attempt.score.$numberDecimal}</td>
                            <td>{attempt.dateTime}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserBadge;
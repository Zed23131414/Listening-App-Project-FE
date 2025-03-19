import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTestStatus from '../hooks/useTestStatus';

const Dashboard = () => {
    const navigate = useNavigate();
    const testCompleted = useTestStatus(); // Lấy trạng thái từ hook

    return (
        <div>
            <h1>🎯 Dashboard</h1>
            {testCompleted ? (
                <p>✅ Bạn đã hoàn thành bài test.</p>
            ) : (
                <button onClick={() => navigate('/test')}>
                    📝 Bắt đầu làm bài test
                </button>
            )}
        </div>
    );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const InvestorProfit = () => {
    const [profit, setProfit] = useState(0);

    useEffect(() => {
        const fetchProfit = async () => {
            try {
                const response = await api.get('/dashboard/summary');
                if (response.data.my_profit) {
                    setProfit(response.data.my_profit);
                }
            } catch (error) {
                console.error('Failed to load profit summary:', error);
            }
        };
        fetchProfit();
    }, []);

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Investor Profit</h2>

            <div className="p-4 bg-yellow-100 rounded shadow mb-6">
                <h3 className="text-lg font-semibold">My Total Profit</h3>
                <p className="text-xl font-bold">${profit.toLocaleString()}</p>
            </div>
        </DashboardLayout>
    );
};

export default InvestorProfit;

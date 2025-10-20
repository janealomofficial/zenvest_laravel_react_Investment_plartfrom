import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const PlatformRevenue = () => {
    const [summary, setSummary] = useState({
        total_investor_profit: 0,
        platform_revenue: 0,
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await api.get('/dashboard/summary');
                setSummary(response.data);
            } catch (error) {
                console.error('Failed to load summary:', error);
            }
        };
        fetchSummary();
    }, []);

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-4">Platform Revenue</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-green-100 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Investor Profit</h3>
                    <p className="text-xl font-bold">
                        ${summary.total_investor_profit?.toLocaleString()}
                    </p>
                </div>

                <div className="p-4 bg-blue-100 rounded shadow">
                    <h3 className="text-lg font-semibold">Platform Revenue</h3>
                    <p className="text-xl font-bold">
                        ${summary.platform_revenue?.toLocaleString()}
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PlatformRevenue;

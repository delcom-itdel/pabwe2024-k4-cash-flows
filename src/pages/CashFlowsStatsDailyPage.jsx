import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetStatsDaily } from "../states/cashFlow/action"; // Pastikan path sudah benar

const CashFlowStatsDailyPage = () => {
  const dispatch = useDispatch();

  // Ambil data `statsDaily` dari Redux store
  const statsDaily = useSelector((state) => state.cashFlow.statsDaily);
  const [loading, setLoading] = useState(true);

  // Ambil data hanya saat komponen pertama kali di-load
  useEffect(() => {
    // dispatch(showLoading()); // Uncomment jika ada action untuk loading global
    dispatch(asyncGetStatsDaily()).finally(() => setLoading(false)); // Set loading ke false setelah action selesai
    // dispatch(hideLoading()); // Uncomment jika ada action untuk hide loading global
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Jika tidak ada data, tampilkan pesan kosong
  if (!statsDaily || !statsDaily.stats_inflow || !statsDaily.stats_outflow) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <h1>Cash Flow Stats Daily</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Inflow</th>
            <th>Outflow</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(statsDaily.stats_inflow).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{statsDaily.stats_inflow[date]}</td>
              <td>{statsDaily.stats_outflow[date]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashFlowStatsDailyPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { asyncDetailCashFlow } from "../states/cash-flows/action";
import { FaMoneyBillWave, FaRegClock, FaRegEdit } from "react-icons/fa";

const CashFlowsDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cashFlow = useSelector((state) => state.detailCashFlow);

  useEffect(() => {
    dispatch(asyncDetailCashFlow(id));
  }, [dispatch, id]);

  if (!cashFlow) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="container"
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#e0e5ec",
        borderRadius: "20px",
        boxShadow: "8px 8px 16px #c1c1c1, -8px -8px 16px #ffffff",
      }}
    >
      <div
        className="card"
        style={{
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
            color: "#343a40",
            fontWeight: "bold",
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          <FaMoneyBillWave style={{ marginRight: "8px", color: "#28a745" }} />
          {cashFlow.label}
        </h2>
        <p style={{ fontSize: "16px", color: "#6c757d", textAlign: "center" }}>
          <strong>Type:</strong> {cashFlow.type} <br />
          <strong>Source:</strong> {cashFlow.source}
        </p>
        <p style={{ fontSize: "16px", color: "#495057", margin: "20px 0" }}>
          {cashFlow.description}
        </p>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>
          <strong>Nominal:</strong> Rp {cashFlow.nominal.toLocaleString()}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <span style={{ fontSize: "14px", color: "#6c757d" }}>
            <FaRegClock style={{ marginRight: "5px" }} />
            {new Date(cashFlow.created_at).toLocaleTimeString()} -{" "}
            {new Date(cashFlow.created_at).toLocaleDateString()}
          </span>
          <Link
            to={`/cash-flows/${id}/edit`}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaRegEdit style={{ marginRight: "5px" }} />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CashFlowsDetailPage;

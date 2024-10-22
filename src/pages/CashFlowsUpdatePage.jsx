import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
	asyncDetailCashFlow,
	asyncUpdateCashFlow,
	updateCashFlowActionCreator,
} from "../states/cash-flows/action";

const CashFlowsUpdatePage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cashFlow = useSelector((state) => state.detailCashFlow);
	const isUpdateCashFlow = useSelector(
		(state) => state.cashFlows.isUpdateCashFlow
	);
	const [type, setType] = useState("");
	const [source, setSource] = useState("");
	const [label, setLabel] = useState("");
	const [description, setDescription] = useState("");
	const [nominal, setNominal] = useState(0);

	useEffect(() => {
		dispatch(asyncDetailCashFlow(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (cashFlow) {
			setType(cashFlow.type);
			setSource(cashFlow.source);
			setLabel(cashFlow.label);
			setDescription(cashFlow.description);
			setNominal(cashFlow.nominal);
		}
	}, [cashFlow]);

	useEffect(() => {
		if (isUpdateCashFlow) {
			navigate(`/cash-flows/${id}`);
			dispatch(updateCashFlowActionCreator(false));
		}
	}, [isUpdateCashFlow, navigate, id, dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Cash flow berhasil di-updat!",
			showConfirmButton: false,
			timer: 700,
		});
		navigate("/");
		dispatch(
			asyncUpdateCashFlow({ id, type, source, label, description, nominal })
		);
	};

	return (
		<div
			className="container"
			style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
		>
			<div className="card-body">
				<h1 style={{ textAlign: "center", marginBottom: "20px" }}>
					Edit Cash Flow
				</h1>
				<form
					onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column", gap: "15px" }}
				>
					<div className="mb-3">
						<label htmlFor="inputType" className="form-label">
							Tipe
						</label>
						<select
							id="inputType"
							className="form-select"
							value={type}
							onChange={(e) => setType(e.target.value)}
							required
						>
							<option value="">Pilih Tipe</option>
							<option value="inflow">Inflow</option>
							<option value="outflow">Outflow</option>
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="inputSource" className="form-label">
							Sumber
						</label>
						<select
							id="inputSource"
							className="form-select"
							value={source}
							onChange={(e) => setSource(e.target.value)}
							required
						>
							<option value="">Pilih Sumber</option>
							<option value="cash">Cash</option>
							<option value="savings">Savings</option>
							<option value="loans">Loans</option>
						</select>
					</div>
					<div className="mb-3">
						<label htmlFor="inputLabel" className="form-label">
							Label
						</label>
						<div className="input-group">
							<input
								type="text"
								id="inputLabel"
								value={label}
								onChange={(e) => setLabel(e.target.value)}
								className="form-control"
								required
							/>
							<span className="input-group-text">{label.length}/50</span>
						</div>
					</div>
					<div className="mb-3">
						<label htmlFor="inputNominal" className="form-label">
							Nominal
						</label>
						<input
							type="number"
							id="inputNominal"
							value={nominal}
							onChange={(e) => setNominal(e.target.value)}
							className="form-control"
							required
						/>
					</div>
					<div>
						<label htmlFor="inputDescription" className="form-label">
							Deskripsi
						</label>
						<textarea
							rows="5"
							id="inputDescription"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="form-control"
							required
						></textarea>
						<div className="text-end">
							<span>{description.length}/1000</span>
						</div>
					</div>
					<button type="submit" className="btn btn-primary mt-3">
						Update Cash Flow
					</button>
				</form>
			</div>
		</div>
	);
};

export default CashFlowsUpdatePage;

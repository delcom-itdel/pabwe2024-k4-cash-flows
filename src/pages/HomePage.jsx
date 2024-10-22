import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CashFlowList from "../components/CashFlowsList";
import {
	asyncGetCashFlows,
	asyncDeleteCashFlow,
	deleteCashFlowActionCreator,
} from "../states/cash-flows/action";

function HomePage() {
	const { cashFlows = [], isDeleteCashFlow = false } = useSelector(
		(state) => state
	);
	const queryParams = new URLSearchParams(location.search);
	const is_finished = queryParams.get("is_finished") || "";
	const dispatch = useDispatch();

	useEffect(() => {
		if (isDeleteCashFlow) {
			dispatch(deleteCashFlowActionCreator(false));
		}
		dispatch(asyncGetCashFlows(is_finished)).catch((error) => {
			console.error("Failed to fetch cash flows:", error);
		});
	}, [dispatch, isDeleteCashFlow]);

	const onDeleteCashFlow = (id) => {
		dispatch(asyncDeleteCashFlow(id)).catch((error) => {
			console.error("Failed to delete cash flow:", error);
		});
	};

	if (!cashFlows.length) {
		return (
			<center>
				<h6>No cash flow data available or failed to load.</h6>
			</center>
		);
	}

	return (
		<section>
			<div className="container pt-1">
				<CashFlowList
					cashFlows={cashFlows}
					onDeleteCashFlow={onDeleteCashFlow}
				/>
			</div>
		</section>
	);
}

export default HomePage;

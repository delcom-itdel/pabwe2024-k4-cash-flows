import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CashFlowList from "../components/CashFlowsList";
import {
	asyncGetCashFlows,
	asyncDeleteCashFlow,
	deleteCashFlowActionCreator,
} from "../states/cash-flows/action";

function HomePage() {
	const { cashflows = [], isDeleteCashFlow = false } = useSelector(
		(states) => states
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isDeleteCashFlow) {
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Cash flow berhasil dihapus!",
				showConfirmButton: false,
				timer: 700,
			});
			dispatch(deleteCashFlowActionCreator(false));
		}

		dispatch(asyncGetCashFlows()).catch((error) => {
			console.error("Gagal mengambil data cashflows:", error);
		});
	}, [dispatch, isDeleteCashFlow]);

	const onDeleteCashFlow = (id) => {
			dispatch(asyncDeleteCashFlow(id))
					.catch((error) => {
							console.error("Gagal menghapus cashflow:", error);
					});
	};
	if (!cashflows.length) {
			return <p>Cashflow tidak tersedia atau gagal memuat data.</p>;
	}
	return (
			<section>
					<div className="container pt-1">
							<CashFlowList
									cashflows={cashflows}
									onDeleteCashFlow={onDeleteCashFlow}
							></CashFlowList>
					</div>
			</section>
	);
}
export default HomePage;

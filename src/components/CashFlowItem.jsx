import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash } from "react-icons/fa6";

function CashFlowItem({ cashFlow, onDeleteCashFlow }) {
	let badgeStatus, badgeLabel;
	if (cashFlow.type.toLowerCase() === "inflow") {
		badgeStatus = "badge bg-success text-white ms-3";
		badgeLabel = "Inflow";
	} else if (cashFlow.type.toLowerCase() === "outflow") {
		badgeStatus = "badge bg-secondary text-white ms-3";
		badgeLabel = "Outflow";
	}

	return (
		<div className="card mt-3">
			<div className="card-body">
				<div className="row align-items-center">
					<div className="col-8 d-flex">
						<h5>
							<Link to={`/cashflows/${cashFlow.id}`} className="text-primary">
								{cashFlow.label}
							</Link>
						</h5>
						<div>
							<span className={badgeStatus}>{badgeLabel}</span>
						</div>
					</div>
					<div className="col-4 text-end">
						<button
							type="button"
							onClick={() => {
								Swal.fire({
									title: "Hapus Cash Flow",
									text: `Apakah kamu yakin ingin menghapus cash flow: ${cashFlow.label}?`,
									icon: "warning",
									showCancelButton: true,
									confirmButtonText: "Ya, Tetap Hapus",
									customClass: {
										confirmButton: "btn btn-danger me-3 mb-4",
										cancelButton: "btn btn-secondary mb-4",
									},
									buttonsStyling: false,
								}).then((result) => {
									if (result.isConfirmed) {
										onDeleteCashFlow(cashFlow.id);
									}
								});
							}}
							className="btn btn-sm btn-outline-danger"
						>
							<FaTrash /> Hapus
						</button>
					</div>
					<div className="col-12">
						<div className="text-sm op-5">
							<FaClock />
							<span className="ps-2">{postedAt(cashFlow.created_at)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const cashFlowItemShape = {
	id: PropTypes.number.isRequired,
	source: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	description: PropTypes.string,
	type: PropTypes.string.isRequired,
	nominal: PropTypes.number.isRequired,
	created_at: PropTypes.string.isRequired,
	updated_at: PropTypes.string.isRequired,
};

CashFlowItem.propTypes = {
	cashFlow: PropTypes.shape(cashFlowItemShape).isRequired,
	onDeleteCashFlow: PropTypes.func.isRequired,
};

export default CashFlowItem;

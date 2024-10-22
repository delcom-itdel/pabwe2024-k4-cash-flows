import { ActionType } from "./action";

function cashFlowsReducer(cashFlows = [], action = {}) {
	switch (action.type) {
		case ActionType.GET_CASHFLOWS:
			return action.payload.cashFlows;
		default:
			return cashFlows;
	}
}

function isAddCashFlowReducer(status = false, action = {}) {
	switch (action.type) {
		case ActionType.ADD_CASHFLOW:
			return action.payload.status;
		default:
			return status;
	}
}

function isDeleteCashFlowReducer(status = false, action = {}) {
	switch (action.type) {
		case ActionType.DELETE_CASHFLOW:
			return action.payload.status;
		default:
			return status;
	}
}

function isUpdateCashFlowReducer(status = false, action = {}) {
	switch (action.type) {
		case ActionType.UPDATE_CASHFLOW:
			return action.payload.status;
		default:
			return status;
	}
}

function detailCashFlowReducer(cashFlow = null, action = {}) {
	switch (action.type) {
		case ActionType.DETAIL_CASHFLOW:
			return action.payload.cashFlow;
		default:
			return cashFlow;
	}
}

export {
	cashFlowsReducer,
	isAddCashFlowReducer,
	isDeleteCashFlowReducer,
	isUpdateCashFlowReducer,
	detailCashFlowReducer,
};

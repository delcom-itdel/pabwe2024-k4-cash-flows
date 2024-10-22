import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_CASHFLOWS: "GET_CASHFLOWS",
  ADD_CASHFLOW: "ADD_CASHFLOW",
  UPDATE_CASHFLOW: "UPDATE_CASHFLOW",
  DELETE_CASHFLOW: "DELETE_CASHFLOW",
  DETAIL_CASHFLOW: "DETAIL_CASHFLOW",
  GET_LABELS: "GET_LABELS",
  GET_STATS_DAILY: "GET_STATS_DAILY",
};

function getCashFlowsActionCreator(cashFlows) {
  return {
    type: ActionType.GET_CASHFLOWS,
    payload: { cashFlows },
  };
}

function addCashFlowActionCreator(status) {
  return {
    type: ActionType.ADD_CASHFLOW,
    payload: { status },
  };
}

function updateCashFlowActionCreator(status) {
  return {
    type: ActionType.UPDATE_CASHFLOW,
    payload: { status },
  };
}

function deleteCashFlowActionCreator(status) {
  return {
    type: ActionType.DELETE_CASHFLOW,
    payload: { status },
  };
}

function detailCashFlowActionCreator(cashFlow) {
  return {
    type: ActionType.DETAIL_CASHFLOW,
    payload: { cashFlow },
  };
}

function getLabelsActionCreator(labels) {
  return {
    type: ActionType.GET_LABELS,
    payload: { labels },
  };
}

function getStatsDailyActionCreator(statsDaily) {
  return {
    type: ActionType.GET_STATS_DAILY,
    payload: { statsDaily },
  };
}

function asyncGetCashFlows() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const cashFlows = await api.getAllCashFlows();
      console.log("Data fetched from API:", cashFlows);
      dispatch(getCashFlowsActionCreator(cashFlows));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddCashFlow({ type, source, label, description, nominal }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddCashFlow({ type, source, label, description, nominal });
      dispatch(addCashFlowActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteCashFlow(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteCashFlow(id);
      dispatch(deleteCashFlowActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpdateCashFlow({
  id,
  type,
  source,
  label,
  description,
  nominal,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateCashFlow({
        id,
        type,
        source,
        label,
        description,
        nominal,
      });
      dispatch(updateCashFlowActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailCashFlow(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const cashFlow = await api.getDetailCashFlow(id);
      dispatch(detailCashFlowActionCreator(cashFlow));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncGetLabels() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const response = await api.getLabels(); // Assuming `api.getLabels` makes a GET request to the `/cash-flows/labels` endpoint.
      console.log("Labels fetched from API:", response.data.labels); // Log the data
      dispatch(getLabelsActionCreator(response.data.labels)); // Dispatch the labels to the reducer
    } catch (error) {
      console.error("Error fetching labels:", error);
    }

    dispatch(hideLoading());
  };
}

function asyncGetStatsDaily() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const statsDaily = await api.getStatsDaily(); // Asumsi `api.getStatsDaily` mengambil data statistik harian dari API
      console.log("Stats Daily fetched from API:", statsDaily); // Log data statistik harian
      dispatch(getStatsDailyActionCreator(statsDaily)); // Dispatch data statistik harian ke reducer
    } catch (error) {
      console.error("Error fetching daily stats:", error);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getCashFlowsActionCreator,
  asyncGetCashFlows,
  addCashFlowActionCreator,
  asyncAddCashFlow,
  deleteCashFlowActionCreator,
  asyncDeleteCashFlow,
  updateCashFlowActionCreator,
  asyncUpdateCashFlow,
  detailCashFlowActionCreator,
  asyncDetailCashFlow,
  getLabelsActionCreator,
  asyncGetLabels,
  getStatsDailyActionCreator,
  asyncGetStatsDaily,
};

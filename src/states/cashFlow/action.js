import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_CASH_FLOW: "GET_CASH_FLOW",
  ADD_CASH_FLOW: "ADD_CASH_FLOW",
  DELETE_CASH_FLOW: "DELETE_CASH_FLOW",
  UPDATE_CASH_FLOW: "UPDATE_CASH_FLOW",
  DETAIL_CASH_FLOW: "DETAIL_CASH_FLOW",
  GET_LABELS: "GET_LABELS",
  GET_STATS_DAILY: "GET_STATS_DAILY",
};

function getCashFlowActionCreator(cashFlows) {
  return {
    type: ActionType.GET_CASH_FLOW,
    payload: { cashFlows },
  };
}
function addCashFlowActionCreator(status) {
  return {
    type: ActionType.ADD_CASH_FLOW,
    payload: { status },
  };
}

function updateCashFlowActionCreator(status) {
  return {
    type: ActionType.UPDATE_CASH_FLOW,
    payload: { status },
  };
}

function deleteCashFlowActionCreator(status) {
  return {
    type: ActionType.DELETE_CASH_FLOW,
    payload: {
      status,
    },
  };
}

function detailCashFlowActionCreator(cashFlow) {
  return {
    type: ActionType.DETAIL_CASH_FLOW,
    payload: {
      cashFlow,
    },
  };
}

function getLabelsActionCreator(labels) {
  return {
    type: ActionType.GET_LABELS,
    payload: { labels },
  };
}

function asyncGetCashFlows() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const cashFlows = await api.getAllCashFlows();
      console.log("Data fetched from API:", cashFlows); // Log the data
      dispatch(getCashFlowActionCreator(cashFlows)); // Store data in Redux
    } catch (error) {
      console.error("Error fetching cash flows:", error);
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
      // Lakukan update cash flow berdasarkan ID
      const updatedCashFlow = await api.putUpdateCashFlow({
        id,
        type,
        source,
        label,
        description,
        nominal,
      });

      // Jika berhasil, dispatch action creator dengan cash flow yang baru
      dispatch(updateCashFlowActionCreator(updatedCashFlow));
    } catch (error) {
      // Tampilkan pesan error jika terjadi kesalahan
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

export {
  ActionType,
  getCashFlowActionCreator,
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
};

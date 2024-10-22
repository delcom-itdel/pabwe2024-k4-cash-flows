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

function labelsReducer(labels = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_LABELS:
      return action.payload.labels || [];
    default:
      return labels;
  }
}

function statsDailyReducer(
  statsDaily = { stats_inflow: {}, stats_outflow: {} },
  action = {}
) {
  switch (action.type) {
    case ActionType.GET_STATS_DAILY:
      return action.payload.statsDaily;
    default:
      return statsDaily;
  }
}

function statsMonthlyReducer(
  statsMonthly = { stats_inflow: {}, stats_outflow: {} },
  action = {}
) {
  switch (action.type) {
    case ActionType.GET_STATS_MONTHLY:
      return action.payload.statsMonthly;
    default:
      return statsMonthly;
  }
}

export {
  cashFlowsReducer,
  isAddCashFlowReducer,
  isDeleteCashFlowReducer,
  isUpdateCashFlowReducer,
  detailCashFlowReducer,
  labelsReducer,
  statsDailyReducer,
  statsMonthlyReducer,
};

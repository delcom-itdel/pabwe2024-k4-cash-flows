import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";
import {
	cashFlowsReducer,
	isAddCashFlowReducer,
	isDeleteCashFlowReducer,
	isUpdateCashFlowReducer,
	detailCashFlowReducer,
} from "./cashFlow/reducer";

const store = configureStore({
	reducer: {
		// Auth
		isAuthRegister: isAuthRegisterReducer,
		authLogin: authLoginReducer,
		isPreload: isPreloadReducer,
		loadingBar: loadingBarReducer,
		// Profile
		isUserChangePhoto: isUserChangePhotoReducer,
		// Cash Flow
		cashFlows: cashFlowsReducer,
		isAddCashFlow: isAddCashFlowReducer,
		isDeleteCashFlow: isDeleteCashFlowReducer,
		isUpdateCashFlow: isUpdateCashFlowReducer,
		detailCashFlow: detailCashFlowReducer,
	},
});

export default store;

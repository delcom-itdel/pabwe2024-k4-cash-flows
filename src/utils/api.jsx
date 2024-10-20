const api = (() => {
	const BASE_URL = "https://public-api.delcom.org/api/v1";
	async function _fetchWithAuth(url, options = {}) {
		return fetch(url, {
			...options,
			headers: {
				...options.headers,
				Authorization: `Bearer ${getAccessToken()}`,
			},
		});
	}
	function putAccessToken(token) {
		localStorage.setItem("accessToken", token);
	}
	function getAccessToken() {
		return localStorage.getItem("accessToken");
	}
	// API Auth => https://public-api.delcom.org/docs/1.0/api-auth
	async function postAuthRegister({ name, email, password }) {
		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		return message;
	}
	async function postAuthLogin({ email, password }) {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		const {
			data: { token },
		} = responseJson;
		return token;
	}
	// API Users => https://public-api.delcom.org/docs/1.0/apiusers
	async function getMe() {
		const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		const {
			data: { user },
		} = responseJson;
		return user;
	}
	async function postChangePhotoProfile({ photoFile }) {
		const formData = new FormData();
		formData.append("photo", photoFile);
		const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
			method: "POST",
			body: formData,
		});
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		return message;
	}
	// API Cashflow => https://public-api.delcom.org/docs/1.0/cash-flows
	async function postAddCashFlow({ type, source, label, description, nominal }) {
		const response = await _fetchWithAuth(`${BASE_URL}/cash-flows`, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: JSON.stringify({
				type,
				source,
				label,
				description,
				nominal,
			}),
		});
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		const {
			data: { cash_flow_id },
		} = responseJson;
		return cash_flow_id;
	}
	async function putUpdateCashFlow({ id, type, source, label, description, nominal }) {
		const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				type,
				source,
				label,
				description,
				nominal,
			}),
		});
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		return message;
	}
	async function deleteCashFlow(id) {
		const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		return message;
	}
	async function getAllCashFlows() {
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}/cash-flows`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(
        responseJson.message || "Gagal mengambil data cash flows"
      );
    }
    return responseJson.data.cash_flows;
	}
	async function getDetailCashFlow(id) {
		const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`);
		const responseJson = await response.json();
		const { success, message } = responseJson;
		if (success !== true) {
			throw new Error(message);
		}
		const {
			data: { cash_flow },
		} = responseJson;
		return cash_flow;
	}

	return {
		putAccessToken,
		getAccessToken,
		postAuthRegister,
		postAuthLogin,
		getMe,
		postChangePhotoProfile,
		postAddCashFlow,
		putUpdateCashFlow,
		deleteCashFlow,
		getAllCashFlows,
		getDetailCashFlow,
	};
})();
export default api;

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

  async function postAuthRegister({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function postAuthLogin({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.token;
  }

  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  }

  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);

    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData,
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function postAddCashFlow({
    type,
    source,
    label,
    description,
    nominal,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, source, label, description, nominal }),
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.cash_flow_id;
  }

  async function putUpdateCashFlow({
    id,
    type,
    source,
    label,
    description,
    nominal,
  }) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, source, label, description, nominal }),
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function deleteCashFlow(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`, {
      method: "DELETE",
    });

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.message;
  }

  async function getAllCashFlows() {
    const token = getAccessToken();
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    console.log("Content-Type:", contentType);
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      throw new Error("Server returned non-JSON response");
    }

    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.cash_flows;
  }

  async function getDetailCashFlow(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/${id}`);
    const responseJson = await response.json();
    if (!responseJson.success) {
      throw new Error(responseJson.message);
    }

    return responseJson.data.cash_flow;
  }

  async function getLabels() {
    const response = await _fetchWithAuth(`${BASE_URL}/cash-flows/labels`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal mengambil labels");
    }

    return responseJson.data.labels; // Mengembalikan array labels
  }

  async function getStatsDaily({ end_date, total_data }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/cash-flows/stats/daily?end_date=${end_date}&total_data=${total_data}`,
      {
        method: "GET",
      }
    );
  
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Gagal mengambil statistik harian");
    }
  
    return responseJson.data;
  }  

  async function getStatsMonthly({ end_date, total_data }) {
    const url = new URL(`${BASE_URL}/cash-flows/stats/monthly`);
    url.searchParams.append("end_date", end_date);
    url.searchParams.append("total_data", total_data);

    const response = await _fetchWithAuth(url.toString(), {
      method: "GET",
    });

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(
        responseJson.message || "Failed to fetch monthly cash flow stats"
      );
    }

    const responseJson = await response.json();
    return responseJson.data;
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
    getLabels,
    getStatsDaily,
    getStatsMonthly,
  };
})();

export default api;

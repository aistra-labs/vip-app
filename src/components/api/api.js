const apiBaseUrl = "https://dev.api.vip.aistra.com"; // Replace with your API base URL

const apiRequest = async (url, method = "GET", data = null) => {
  const apiUrl = `${apiBaseUrl}/${url}`;
  const token = localStorage.getItem("token");
  try {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        // Add any additional headers as needed
      },
      body: method === "POST" ? JSON.stringify(data) : null,
    };

    const response = await fetch(apiUrl, config);
    const responseData = await response.json();
    if (!response.ok) {
      if (response.status === 403) {
        localStorage.clear();
        window.location.href = "/";
        throw new Error("Bad Request");
      }
      return responseData;
    }

    return responseData;
  } catch (error) {
    console.error(
      "API request failed:",
      error.statusCode,
      error.message,
      error
    );
    // return error;
    // Handle specific error cases
    if (error.message === "Bad Request") {
      return error;
      // Redirect to home page using the useNavigate hook
    }
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export default apiRequest;

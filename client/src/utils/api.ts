import axios from "axios";

// Create an instance of axios
const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor
api.interceptors.request.use(
	(config) => {
		// Get the token from localStorage
		const state = localStorage.getItem("user-store");
		if (state) {
			const parsedState = JSON.parse(state);
			const token = parsedState.state.token;
			console.log("TOKEN", token);

			// If the token exists, add it to the Authorization header
			if (token) {
				if (config.headers) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
		}
		return config;
	},
	(error) => {
		// Handle the error
		return Promise.reject(error);
	}
);

// Add a response interceptor
api.interceptors.response.use(
	(response) => {
		// Return the response if it's successful
		return response;
	},
	(error) => {
		// Check if the error response status is 401
		if (error.response && error.response.status === 401) {
			// Remove the token from localStorage
			localStorage.removeItem("user-store");

			// Get the current visited URL
			const currentUrl = window.location.href;

			// Create a callback URL
			const callbackUrl = encodeURIComponent(currentUrl);

			// Redirect the user to the login page with the callback URL as a redirect route parameter
			//window.location.href = `/login?redirect=${callbackUrl}`;
			console.log(
				"AXIO API INTERCEPTOR",
				callbackUrl,
				currentUrl,
				error.response
			);
		}

		// Return the error
		return Promise.reject(error);
	}
);

export default api;

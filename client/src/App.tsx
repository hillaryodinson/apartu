import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/auth-provider";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
	const queryClient = new QueryClient();
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={routes} />
			</QueryClientProvider>
			<ToastContainer />
		</AuthProvider>
	);
}

export default App;

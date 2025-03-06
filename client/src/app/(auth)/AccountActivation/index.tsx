import api from "../../../utils/api";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, CircleXIcon, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { buttonVariants } from "@/components/ui/button";

const AccountActivationPage = () => {
	const location = useLocation();
	const [status, setStatus] = useState<"success" | "error">();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		// Get the token from the URL
		const token = params.get("token");

		if (!token) {
			// If transaction id or type is not found, redirect to error page
			setStatus("error");
			return;
		}

		// Make a request to server to update the status of the transaction
		api.put(`/user/verify-email/${token}`)
			.then((res) => {
				// Handle the response based on the type
				if (res.status == 200) {
					setStatus("success");
				} else {
					setStatus("error");
				}
			})
			.catch(() => {
				setStatus("error");
			});
	}, [location.search]);

	return (
		<>
			<Helmet>
				<title>Activation Account | Apartu</title>
			</Helmet>
			<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
				<div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900 z-2"></div>
				<div className="container relative z-3">
					<div className="flex justify-center">
						<div className="max-w-[400px] text-center items-center flex flex-col w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
							{status && status == "success" ? (
								<>
									<CheckCircle
										size={64}
										className="text-green-500"
									/>
									<h2 className="text-xl font-bold mt-4">
										Activation Successful
									</h2>
									<p className="text-gray-600 mt-2 mb-4">
										Your account was activated successfully.
										Login to continue
									</p>
									<Link
										to="/login"
										className={buttonVariants({
											size: "sm",
											variant: "default",
										})}>
										Log in
									</Link>
								</>
							) : status == "error" ? (
								<>
									<CircleXIcon
										size={64}
										className="text-red-500"
									/>
									<h2 className="text-xl font-bold mt-4">
										Activation Failed
									</h2>
									<p className="text-gray-600 mt-2 mb-4">
										Invalid Token or token has expired.
										Login to resend another activation link
									</p>
									<Link
										to="/login"
										className={buttonVariants({
											size: "sm",
											variant: "default",
										})}>
										Log in
									</Link>
								</>
							) : (
								<>
									<Loader2
										size={64}
										className="animated-spin"
									/>
									<h2 className="text-xl font-bold mt-4">
										Please Wait
									</h2>
									<p className="text-gray-600 mt-2">
										While we activate your account
									</p>
								</>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AccountActivationPage;

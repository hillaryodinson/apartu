import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../utils/zod";
import { z } from "zod";
import api from "../../../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiResponse, AuthResponse } from "../../../utils/types";
// import { useAuth } from "../../../providers/auth-provider";
import { useUserStore } from "../../../store/user-store";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const LoginPage = () => {
	const params = useParams();
	// const context = useAuth();
	const redirect = useNavigate();
	const setSession = useUserStore((state) => state.setSession);
	const [isLoading, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const formSubmit = (data: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			api.post("/auth/login", data)
				.then((response) => {
					if (response.status == 200) {
						const { data, success } =
							response.data as ApiResponse<AuthResponse>;
						if (success) {
							if (data) {
								toast.success("Login was successful");

								// context.login(data);
								setSession(data);
								//check for callbackurl
								setTimeout(() => {
									const callback =
										params.redirect || "/dashboard";
									redirect(callback);
								}, 3000);
							}
						}
					} else {
						throw new Error("Invalid username or password");
					}
				})
				.catch((errors) => {
					toast.error(errors);
				});
		});
	};

	return (
		<>
			<Helmet>
				<title>Login | Apartu</title>
			</Helmet>
			<section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
				<div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover"></div>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900 z-2"></div>
				<div className="container relative z-3">
					<div className="flex justify-center">
						<div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
							<Link to="/">
								<img
									src="assets/images/logo.png"
									className="mx-auto"
									alt=""
								/>
							</Link>
							<h5 className="my-6 text-xl font-semibold">
								Login
							</h5>
							<form
								className="text-start"
								onSubmit={handleSubmit(formSubmit)}>
								<div className="grid grid-cols-1">
									<div className="mb-4">
										<label
											className="font-medium"
											htmlFor="LoginEmail">
											Email Address:
										</label>
										<input
											id="LoginEmail"
											type="email"
											{...register("email")}
											className="form-input border !border-gray-200 dark:!border-gray-800 mt-3"
											placeholder="name@example.com"
										/>
										{errors.email && (
											<p className="text-red-500 text-sm">
												{errors.email?.message}
											</p>
										)}
									</div>

									<div className="mb-4">
										<label
											className="font-medium"
											htmlFor="LoginPassword">
											Password:
										</label>
										<input
											id="LoginPassword"
											type="password"
											{...register("password")}
											className="form-input border !border-gray-200 dark:!border-gray-800 mt-3"
											placeholder="Password"
											disabled={isLoading}
										/>
										{errors.password && (
											<p className="text-red-500 text-sm">
												{errors.password?.message}
											</p>
										)}
									</div>

									<div className="flex justify-between mb-4">
										<div className="flex items-center mb-0">
											<input
												className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-green-600 checked:appearance-auto dark:accent-green-600 focus:border-green-300 focus:ring-0 focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2"
												type="checkbox"
												value=""
												id="RememberMe"
												disabled={isLoading}
											/>
											<label
												className="form-checkbox-label text-slate-400"
												htmlFor="RememberMe">
												Remember me
											</label>
										</div>
										<p className="text-slate-400 mb-0">
											<a
												href="auth-re-password.html"
												className="text-slate-400">
												Forgot password ?
											</a>
										</p>
									</div>

									<div className="mb-4">
										<button
											type="submit"
											className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full"
											disabled={isLoading}>
											{isLoading && (
												<Loader2 className="animated-spin" />
											)}
											Sign in
										</button>
									</div>

									<div className="text-center">
										<span className="text-slate-400 me-2">
											Don't have an account ?
										</span>{" "}
										<a
											href="auth-signup.html"
											className="text-slate-900 dark:text-white font-bold">
											Sign Up
										</a>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginPage;

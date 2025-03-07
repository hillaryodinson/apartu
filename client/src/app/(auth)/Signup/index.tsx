import { useUserStore } from "@/store/user-store";
import api from "@/utils/api";
import { ApiResponse, AuthResponse } from "@/utils/types";
import { SignupSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const SignUpPage = () => {
	const redirect = useNavigate();
	const [isLoading, startTransition] = useTransition();
	const isAuthenticated = useUserStore((state) => state.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			redirect("/dashboard");
		}
	}, [isAuthenticated, redirect]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: undefined,
		},
	});

	const formSubmit = (data: z.infer<typeof SignupSchema>) => {
		startTransition(() => {
			api.post("/user/register", data)
				.then((response) => {
					if (response.status !== 201 && response.status !== 200) {
						throw new Error(
							"An error occured. Account not created please contact administrator"
						);
					}

					const { success, message } =
						response.data as ApiResponse<AuthResponse>;

					if (success) {
						toast.success(
							"Account was created please check email for activation link"
						);
						redirect("/login");
					} else {
						toast.error(message);
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
				<title>Signup | Apartu</title>
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
								Sign up
							</h5>
							<form
								className="text-start"
								onSubmit={handleSubmit(formSubmit)}>
								<div className="mb-4">
									<label
										className="font-medium"
										htmlFor="fullname">
										Full Name:
									</label>
									<input
										id="fullname"
										type="text"
										{...register("name")}
										className="form-input border !border-gray-200 dark:!border-gray-800 mt-3"
										placeholder="Full Name"
										disabled={isLoading}
									/>
									{errors.password && (
										<p className="text-red-500 text-sm">
											{errors.password?.message}
										</p>
									)}
								</div>

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
											disabled={isLoading}
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

									<div className="grid grid-cols-1">
										<div className="mb-4">
											<legend className="text-sm/6 font-semibold text-gray-900">
												Role
											</legend>
											<p className="mt-1 text-sm/6 text-gray-600">
												What brings you to Apartu?
											</p>
											<div className=" space-y-2">
												<div className="flex items-center gap-x-3">
													<input
														{...register("role")}
														disabled={isLoading}
														value="landlord"
														id="landlord"
														type="radio"
														className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
													/>
													<label
														htmlFor="landlord"
														className="block text-sm/6 font-medium text-gray-900">
														I want to rent or sell
														my property
													</label>
												</div>
												<div className="flex items-center gap-x-3">
													<input
														{...register("role")}
														disabled={isLoading}
														id="caretaker"
														type="radio"
														value="caretaker"
														className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
													/>
													<label
														htmlFor="caretaker"
														className="block text-sm/6 font-medium text-gray-900">
														I want to manage
														property for others
													</label>
												</div>
												<div className="flex items-center gap-x-3">
													<input
														{...register("role")}
														disabled={isLoading}
														id="tenant"
														type="radio"
														value="tenant"
														className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
													/>
													<label
														htmlFor="tenant"
														className="block text-sm/6 font-medium text-gray-900">
														I am looking for a
														property or roomie
													</label>
												</div>
											</div>
										</div>
									</div>

									<div className="mb-4">
										<label
											className="font-medium"
											htmlFor="SignupPassword">
											Password:
										</label>
										<input
											id="SignupPassword"
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

									<div className="mb-4">
										<button
											type="submit"
											className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full"
											disabled={isLoading}>
											{isLoading && (
												<Loader2 className="animated-spin" />
											)}
											Create Account
										</button>
									</div>

									<div className="text-center">
										<span className="text-slate-400 me-2">
											Already have an account?
										</span>
										<Link
											to="/login"
											className="text-slate-900 dark:text-white font-bold">
											Login
										</Link>
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

export default SignUpPage;

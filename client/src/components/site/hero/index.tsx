const HeroSection = () => {
	return (
		<section className="relative overflow-hidden md:h-screen flex items-center md:py-0 py-36 pt-24 bg-cyan-100 dark:bg-cyan-500/20 bg-[url('../../assets/images/bg/bg3.png')] bg-no-repeat bg-top bg-cover">
			<div className="container relative">
				<div className="grid grid-cols-1 items-center mt-10">
					<div className="md:text-start text-center">
						<h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">
							We will find a perfect <br /> home for you
						</h1>
						<p className="text-xl max-w-xl">
							A great plateform to buy, sell and rent your
							properties without any agent or commisions.
						</p>

						<div className="relative flex mt-8">
							<div className="lg:w-5/6 w-full">
								<ul
									className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b border-gray-200 dark:border-gray-800"
									id="myTab"
									data-tabs-toggle="#StarterContent"
									role="tablist">
									<li
										role="presentation"
										className="inline-block">
										<button
											className="px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out text-white bg-green-600"
											id="buy-home-tab"
											data-tabs-target="#buy-home"
											type="button"
											role="tab"
											aria-controls="buy-home"
											aria-selected="true">
											Buy
										</button>
									</li>
									<li
										role="presentation"
										className="inline-block">
										<button
											className="px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out hover:text-green-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
											id="sell-home-tab"
											data-tabs-target="#sell-home"
											type="button"
											role="tab"
											aria-controls="sell-home"
											aria-selected="false">
											Sell
										</button>
									</li>
									<li
										role="presentation"
										className="inline-block">
										<button
											className="px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out hover:text-green-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800"
											id="rent-home-tab"
											data-tabs-target="#rent-home"
											type="button"
											role="tab"
											aria-controls="rent-home"
											aria-selected="false">
											Rent
										</button>
									</li>
								</ul>

								<div
									id="StarterContent"
									className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md dark:shadow-gray-700">
									<div
										className=""
										id="buy-home"
										role="tabpanel"
										aria-labelledby="buy-home-tab">
										<form action="#">
											<div className="registration-form text-slate-900 text-start">
												<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
													<div>
														<label className="form-label font-medium text-slate-900 dark:text-white">
															Search :{" "}
															<span className="text-red-600">
																*
															</span>
														</label>
														<div className="filter-search-form relative filter-border mt-2">
															<i className="uil uil-search icons"></i>
															<input
																name="name"
																type="text"
																id="job-keyword"
																className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
																placeholder="Search your keaywords"
															/>
														</div>
													</div>

													<div>
														<label
															htmlFor="buy-properties"
															className="form-label font-medium text-slate-900 dark:text-white">
															Select Categories:
														</label>
														<div className="filter-search-form relative filter-border mt-2"></div>
													</div>

													<div>
														<label
															htmlFor="buy-min-price"
															className="form-label font-medium text-slate-900 dark:text-white">
															Budget :
														</label>
														<div className="filter-search-form relative mt-2">
															<i className="uil uil-usd-circle icons"></i>
														</div>
													</div>

													<div className="md:mt-8">
														<input
															type="submit"
															id="search-buy"
															name="search"
															className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-[60px] rounded lg:rounded-none"
															value="Search"
														/>
													</div>
												</div>
											</div>
										</form>
									</div>

									<div
										className="hidden"
										id="sell-home"
										role="tabpanel"
										aria-labelledby="sell-home-tab">
										<form action="#">
											<div className="registration-form text-slate-900 ltr:text-start rtl:text-end">
												<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
													<div>
														<label className="form-label font-medium text-slate-900 dark:text-white">
															Search :{" "}
															<span className="text-red-600">
																*
															</span>
														</label>
														<div className="filter-search-form relative filter-border mt-2">
															<i className="uil uil-search icons"></i>
															<input
																name="name"
																type="text"
																id="job-keyword"
																className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
																placeholder="Search your keaywords"
															/>
														</div>
													</div>

													<div>
														<label
															htmlFor="buy-properties"
															className="form-label font-medium text-slate-900 dark:text-white">
															Select Categories:
														</label>
														<div className="filter-search-form relative filter-border mt-2">
															<i className="uil uil-estate icons"></i>
															<div
																className="choices"
																data-type="select-one"
																tabIndex={0}
																role="combobox"
																aria-autoComplete="list"
																aria-haspopup="true"
																aria-expanded="false">
																<div className="choices__inner">
																	<select
																		className="form-select z-2 choices__input"
																		data-trigger=""
																		name="choices-catagory"
																		id="choices-catagory-sell"
																		aria-label="Default select example"
																		hidden={
																			false
																		}
																		tabIndex={
																			-1
																		}
																		data-choice="active">
																		<option
																			selected={
																				true
																			}>
																			Houses
																		</option>
																		<option>
																			Apartment
																		</option>
																		<option>
																			Offices
																		</option>
																		<option>
																			Townhome
																		</option>
																	</select>
																	<div
																		className="choices__list choices__list--single"
																		role="listbox">
																		<div
																			className="choices__item choices__item--selectable"
																			data-item=""
																			data-id="1"
																			data-value="Houses"
																			aria-selected="true"
																			role="option">
																			Houses
																		</div>
																	</div>
																</div>
																<div
																	className="choices__list choices__list--dropdown"
																	aria-expanded="false">
																	<input
																		type="search"
																		className="choices__input choices__input--cloned"
																		autoComplete="off"
																		autoCapitalize="off"
																		spellCheck="false"
																		role="textbox"
																		aria-autoComplete="list"
																		placeholder=""
																	/>
																	<div
																		className="choices__list"
																		role="listbox">
																		<div
																			id="choices--choices-catagory-sell-item-choice-2"
																			className="choices__item choices__item--choice choices__item--selectable is-highlighted"
																			role="option"
																			data-choice=""
																			data-id="2"
																			data-value="Apartment"
																			data-select-text="Press to select"
																			data-choice-selectable=""
																			aria-selected="true">
																			Apartment
																		</div>
																		<div
																			id="choices--choices-catagory-sell-item-choice-1"
																			className="choices__item choices__item--choice is-selected choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="1"
																			data-value="Houses"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Houses
																		</div>
																		<div
																			id="choices--choices-catagory-sell-item-choice-3"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="3"
																			data-value="Offices"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Offices
																		</div>
																		<div
																			id="choices--choices-catagory-sell-item-choice-4"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="4"
																			data-value="Townhome"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Townhome
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div>
														<label
															htmlFor="buy-min-price"
															className="form-label font-medium text-slate-900 dark:text-white">
															Budget :
														</label>
														<div className="filter-search-form relative mt-2">
															<i className="uil uil-usd-circle icons"></i>
															<div
																className="choices"
																data-type="select-one"
																tabIndex={0}
																role="combobox"
																aria-autoComplete="list"
																aria-haspopup="true"
																aria-expanded="false">
																<div className="choices__inner">
																	<select
																		className="form-select choices__input"
																		data-trigger=""
																		name="choices-min-price"
																		id="choices-min-price-sell"
																		aria-label="Default select example"
																		hidden={
																			false
																		}
																		tabIndex={
																			-1
																		}
																		data-choice="active">
																		<option
																			selected={
																				true
																			}>
																			Budget
																		</option>
																		<option>
																			500
																		</option>
																		<option>
																			1000
																		</option>
																		<option>
																			2000
																		</option>
																		<option>
																			3000
																		</option>
																		<option>
																			4000
																		</option>
																		<option>
																			5000
																		</option>
																		<option>
																			6000
																		</option>
																	</select>
																	<div
																		className="choices__list choices__list--single"
																		role="listbox">
																		<div
																			className="choices__item choices__item--selectable"
																			data-item=""
																			data-id="1"
																			data-value="Budget"
																			aria-selected="true"
																			role="option">
																			Budget
																		</div>
																	</div>
																</div>
																<div
																	className="choices__list choices__list--dropdown"
																	aria-expanded="false">
																	<input
																		type="search"
																		className="choices__input choices__input--cloned"
																		autoComplete="off"
																		autoCapitalize="off"
																		spellCheck="false"
																		role="textbox"
																		aria-autoComplete="list"
																		placeholder=""
																	/>
																	<div
																		className="choices__list"
																		role="listbox">
																		<div
																			id="choices--choices-min-price-sell-item-choice-2"
																			className="choices__item choices__item--choice choices__item--selectable is-highlighted"
																			role="option"
																			data-choice=""
																			data-id="2"
																			data-value="500"
																			data-select-text="Press to select"
																			data-choice-selectable=""
																			aria-selected="true">
																			500
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-3"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="3"
																			data-value="1000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			1000
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-4"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="4"
																			data-value="2000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			2000
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-5"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="5"
																			data-value="3000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			3000
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-6"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="6"
																			data-value="4000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			4000
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-7"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="7"
																			data-value="5000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			5000
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-8"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="8"
																			data-value="6000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			6000
																		</div>
																		<div
																			id="choices--choices-min-price-sell-item-choice-1"
																			className="choices__item choices__item--choice is-selected choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="1"
																			data-value="Budget"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Budget
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="md:mt-8">
														<input
															type="submit"
															id="search-sell"
															name="search"
															className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-[60px] rounded lg:rounded-none"
															value="Search"
														/>
													</div>
												</div>
											</div>
										</form>
									</div>

									<div
										className="hidden"
										id="rent-home"
										role="tabpanel"
										aria-labelledby="rent-home-tab">
										<form action="#">
											<div className="registration-form text-slate-900 ltr:text-start rtl:text-end">
												<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
													<div>
														<label className="form-label font-medium text-slate-900 dark:text-white">
															Search :{" "}
															<span className="text-red-600">
																*
															</span>
														</label>
														<div className="filter-search-form relative filter-border mt-2">
															<i className="uil uil-search icons"></i>
															<input
																name="name"
																type="text"
																id="job-keyword"
																className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
																placeholder="Search your keaywords"
															/>
														</div>
													</div>

													<div>
														<label
															htmlFor="buy-properties"
															className="form-label font-medium text-slate-900 dark:text-white">
															Select Categories:
														</label>
														<div className="filter-search-form relative filter-border mt-2">
															<i className="uil uil-estate icons"></i>
															<div
																className="choices"
																data-type="select-one"
																tabIndex={0}
																role="combobox"
																aria-autoComplete="list"
																aria-haspopup="true"
																aria-expanded="false">
																<div className="choices__inner">
																	<select
																		className="form-select z-2 choices__input"
																		data-trigger=""
																		name="choices-catagory"
																		id="choices-catagory-rent"
																		aria-label="Default select example"
																		hidden={
																			false
																		}
																		tabIndex={
																			-1
																		}
																		data-choice="active">
																		<option
																			selected={
																				true
																			}>
																			Houses
																		</option>
																		<option>
																			Apartment
																		</option>
																		<option>
																			Offices
																		</option>
																		<option>
																			Townhome
																		</option>
																	</select>
																	<div
																		className="choices__list choices__list--single"
																		role="listbox">
																		<div
																			className="choices__item choices__item--selectable"
																			data-item=""
																			data-id="1"
																			data-value="Houses"
																			aria-selected="true"
																			role="option">
																			Houses
																		</div>
																	</div>
																</div>
																<div
																	className="choices__list choices__list--dropdown"
																	aria-expanded="false">
																	<input
																		type="search"
																		className="choices__input choices__input--cloned"
																		autoComplete="off"
																		autoCapitalize="off"
																		spellCheck="false"
																		role="textbox"
																		aria-autoComplete="list"
																		placeholder=""
																	/>
																	<div
																		className="choices__list"
																		role="listbox">
																		<div
																			id="choices--choices-catagory-rent-item-choice-2"
																			className="choices__item choices__item--choice choices__item--selectable is-highlighted"
																			role="option"
																			data-choice=""
																			data-id="2"
																			data-value="Apartment"
																			data-select-text="Press to select"
																			data-choice-selectable=""
																			aria-selected="true">
																			Apartment
																		</div>
																		<div
																			id="choices--choices-catagory-rent-item-choice-1"
																			className="choices__item choices__item--choice is-selected choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="1"
																			data-value="Houses"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Houses
																		</div>
																		<div
																			id="choices--choices-catagory-rent-item-choice-3"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="3"
																			data-value="Offices"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Offices
																		</div>
																		<div
																			id="choices--choices-catagory-rent-item-choice-4"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="4"
																			data-value="Townhome"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Townhome
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div>
														<label
															htmlFor="buy-min-price"
															className="form-label font-medium text-slate-900 dark:text-white">
															Budget :
														</label>
														<div className="filter-search-form relative mt-2">
															<i className="uil uil-usd-circle icons"></i>
															<div
																className="choices"
																data-type="select-one"
																tabIndex={0}
																role="combobox"
																aria-autoComplete="list"
																aria-haspopup="true"
																aria-expanded="false">
																<div className="choices__inner">
																	<select
																		className="form-select choices__input"
																		data-trigger=""
																		name="choices-min-price"
																		id="choices-min-price-rent"
																		aria-label="Default select example"
																		hidden={
																			false
																		}
																		tabIndex={
																			-1
																		}
																		data-choice="active">
																		<option>
																			Budget
																		</option>
																		<option>
																			500
																		</option>
																		<option>
																			1000
																		</option>
																		<option>
																			2000
																		</option>
																		<option>
																			3000
																		</option>
																		<option>
																			4000
																		</option>
																		<option>
																			5000
																		</option>
																		<option>
																			6000
																		</option>
																	</select>
																	<div
																		className="choices__list choices__list--single"
																		role="listbox">
																		<div
																			className="choices__item choices__item--selectable"
																			data-item=""
																			data-id="1"
																			data-value="Budget"
																			aria-selected="true"
																			role="option">
																			Budget
																		</div>
																	</div>
																</div>
																<div
																	className="choices__list choices__list--dropdown"
																	aria-expanded="false">
																	<input
																		type="search"
																		className="choices__input choices__input--cloned"
																		autoComplete="off"
																		autoCapitalize="off"
																		spellCheck="false"
																		role="textbox"
																		aria-autoComplete="list"
																		placeholder=""
																	/>
																	<div
																		className="choices__list"
																		role="listbox">
																		<div
																			id="choices--choices-min-price-rent-item-choice-2"
																			className="choices__item choices__item--choice choices__item--selectable is-highlighted"
																			role="option"
																			data-choice=""
																			data-id="2"
																			data-value="500"
																			data-select-text="Press to select"
																			data-choice-selectable=""
																			aria-selected="true">
																			500
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-3"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="3"
																			data-value="1000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			1000
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-4"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="4"
																			data-value="2000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			2000
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-5"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="5"
																			data-value="3000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			3000
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-6"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="6"
																			data-value="4000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			4000
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-7"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="7"
																			data-value="5000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			5000
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-8"
																			className="choices__item choices__item--choice choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="8"
																			data-value="6000"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			6000
																		</div>
																		<div
																			id="choices--choices-min-price-rent-item-choice-1"
																			className="choices__item choices__item--choice is-selected choices__item--selectable"
																			role="option"
																			data-choice=""
																			data-id="1"
																			data-value="Budget"
																			data-select-text="Press to select"
																			data-choice-selectable="">
																			Budget
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="md:mt-8">
														<input
															type="submit"
															id="search-rent"
															name="search"
															className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-[60px] rounded lg:rounded-none"
															value="Search"
														/>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;

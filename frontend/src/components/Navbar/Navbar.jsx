import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Logo from '../../assets/rmit_logo.jpg'
import { NavLink } from "react-router-dom";
import './style.css'
import ExpandableSearch from "../ExpandableSearch";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full bg-slate-50 fixed top-0 z-10 shadow-lg text-gray-950 font-semibold">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<NavLink to='/'>
								<img
								className="h-10 w-auto"
								src={Logo}
								alt="Logo"
							/>
							</NavLink>
						</div>
						<div className="hidden md:block pl-2">
							<div className="ml-12 flex items-baseline space-x-8">
								<NavLink to="/">HOME</NavLink>
								<NavLink to="/about">ABOUT</NavLink>
								<NavLink to="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">TERMS</NavLink>
							</div>
						</div>
					</div>
					<div className="hidden md:block">
						<div className="flex items-center">
							<ExpandableSearch />
						</div>
					</div>
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="bg-white inline-flex items-center justify-center p-2 rounded-md text-ascend-blue hover:text-white hover:bg-ascend-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ascend-blue focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<X className="block h-6 w-6 duration-300" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden ease-in-out" id="mobile-menu">
					<div className="px-2 pt-2 text-center pb-3 space-y-1 sm:px-3">
						<NavLink to="/" className="block px-3 py-2 rounded-md text-base font-medium">HOME</NavLink>
						<NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium">ABOUT</NavLink>
						<NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium">TERMS</NavLink>
					</div>
					<div className="py-2 border-t border-airbnb">
						<div className="flex items-center px-5">
							<button className="ml-auto bg-ascend-blue flex-shrink-0 p-1 rounded-full text-gray-950 hover:text-airbnb focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
								<ExpandableSearch />
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
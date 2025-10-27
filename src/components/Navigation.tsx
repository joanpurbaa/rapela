import React from "react";
import { Home, BarChart3, Sprout, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navigation: React.FC = () => {
	const location = useLocation();

	const navItems = [
		{ path: "/", icon: Home, label: "Dashboard" },
		{ path: "/analytics", icon: BarChart3, label: "Analytics" },
		{ path: "/plants", icon: Sprout, label: "Plants" },
		{ path: "/marketplace", icon: ShoppingCart, label: "Marketplace" },
	];

	return (
		<>
			<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg z-50">
				<div className="flex justify-around items-center px-2 py-2">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;

						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[70px] ${
									isActive
										? "text-green-600"
										: "text-gray-500 hover:text-green-600 hover:bg-green-50"
								}`}>
								<div
									className={`relative ${
										isActive ? "transform -translate-y-1" : ""
									} transition-transform`}>
									<Icon
										className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-2"}`}
									/>
									{isActive && (
										<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full" />
									)}
								</div>
								<span
									className={`text-xs font-medium ${isActive ? "text-green-600" : ""}`}>
									{item.label}
								</span>
							</Link>
						);
					})}
				</div>
			</nav>

			<nav className="hidden md:block fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-2 z-50">
				<div className="flex gap-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;

						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all ${
									isActive
										? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-200"
										: "text-gray-600 hover:text-green-600 hover:bg-green-50"
								}`}>
								<Icon className="w-5 h-5" />
								<span className="text-sm">{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
};

export default Navigation;

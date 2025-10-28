import React from "react";
import { ShoppingCart, TrendingUp, Package } from "lucide-react";

const Marketplace: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4 md:p-8 pb-24">
			<div className="max-w-7xl mx-auto">
				{" "}
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-pink-800 mb-2">
						Marketplace
					</h1>
					<p className="text-gray-600">
						Jual hasil panen dan beli kebutuhan pertanian
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all">
						<div className="flex items-center gap-3 mb-4">
							<div className="bg-pink-100 p-2 rounded-lg">
								<ShoppingCart className="w-6 h-6 text-pink-500" />
							</div>
							<h3 className="text-lg font-semibold text-gray-800">
								Jual Hasil Panen
							</h3>
						</div>
						<p className="text-gray-600 mb-4 min-h-[40px]">
							Jual produk segar langsung dari kebun Anda ke pasar yang lebih luas.
						</p>
						<button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all">
							Mulai Jual
						</button>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl hover:border-green-200 transition-all">
						<div className="flex items-center gap-3 mb-4">
							<div className="bg-green-100 p-2 rounded-lg">
								<Package className="w-6 h-6 text-green-500" />
							</div>
							<h3 className="text-lg font-semibold text-gray-800">
								Beli Kebutuhan
							</h3>
						</div>
						<p className="text-gray-600 mb-4 min-h-[40px]">
							Temukan nutrisi, benih, dan peralatan pertanian berkualitas terbaik.
						</p>
						<button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all">
							Belanja Sekarang
						</button>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl hover:border-blue-200 transition-all">
						<div className="flex items-center gap-3 mb-4">
							<div className="bg-blue-100 p-2 rounded-lg">
								<TrendingUp className="w-6 h-6 text-blue-500" />
							</div>
							<h3 className="text-lg font-semibold text-gray-800">Harga Pasar</h3>
						</div>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Selada</span>
								<span className="font-bold text-gray-800">Rp 25.000/kg</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Bayam</span>
								<span className="font-bold text-gray-800">Rp 18.000/kg</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Kangkung</span>
								<span className="font-bold text-gray-800">Rp 15.000/kg</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Pakcoy</span>
								<span className="font-bold text-gray-800">Rp 17.000/kg</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Marketplace;
import React from "react";
import { ShoppingCart, TrendingUp, Package } from "lucide-react";

const Marketplace: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4 md:p-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-pink-800 mb-2">Marketplace</h1>
				<p className="text-gray-600">
					Jual hasil panen dan beli kebutuhan pertanian
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
					<div className="flex items-center gap-3 mb-4">
						<ShoppingCart className="w-8 h-8 text-pink-500" />
						<h3 className="text-lg font-semibold text-gray-800">Jual Hasil Panen</h3>
					</div>
					<p className="text-gray-600 mb-4">
						Jual produk segar langsung dari kebun Anda
					</p>
					<button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-xl font-medium">
						Mulai Jual
					</button>
				</div>

				<div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
					<div className="flex items-center gap-3 mb-4">
						<Package className="w-8 h-8 text-green-500" />
						<h3 className="text-lg font-semibold text-gray-800">Beli Kebutuhan</h3>
					</div>
					<p className="text-gray-600 mb-4">
						Nutrisi, benih, dan peralatan pertanian
					</p>
					<button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl font-medium">
						Belanja Sekarang
					</button>
				</div>

				<div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
					<div className="flex items-center gap-3 mb-4">
						<TrendingUp className="w-8 h-8 text-blue-500" />
						<h3 className="text-lg font-semibold text-gray-800">Harga Pasar</h3>
					</div>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Selada</span>
							<span className="font-bold text-green-600">Rp 25.000/kg</span>
						</div>
						<div className="flex justify-between">
							<span>Bayam</span>
							<span className="font-bold text-green-600">Rp 18.000/kg</span>
						</div>
						<div className="flex justify-between">
							<span>Kangkung</span>
							<span className="font-bold text-green-600">Rp 15.000/kg</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Marketplace;

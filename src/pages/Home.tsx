import React, { useState, useEffect } from "react";
import {
	Droplets,
	Thermometer,
	Wind,
	Sun,
	Zap,
	Calendar,
	TrendingUp,
	Leaf,
	ShoppingCart,
	Power,
	CheckCircle,
	Activity,
	Clock,
} from "lucide-react";

type ControlDevice = "pompa" | "lampu" | "valve";

interface SensorData {
	nutrisi: {
		ppm: number;
		ph: number;
		suhuAir: number;
		status: string;
	};
	lingkungan: {
		suhuUdara: number;
		kelembapan: number;
		cahaya: number;
		co2: number;
	};
	air: {
		kualitas: string;
		tekanan: number;
		statusFilter: string;
	};
	energi: {
		konsumsi: number;
		surya: number;
		grid: number;
		penghematan: number;
	};
	kalenderTanam: {
		rak: string;
		tanaman: string;
		hari: number;
		totalHari: number;
	}[];
	prediksi: {
		panenEstimasi: string;
		risikoLevel: string;
		maintenanceNext: string;
	};
}

const Home: React.FC = () => {
	const [data, setData] = useState<SensorData>({
		nutrisi: {
			ppm: 850,
			ph: 6.2,
			suhuAir: 24,
			status: "optimal",
		},
		lingkungan: {
			suhuUdara: 26,
			kelembapan: 65,
			cahaya: 85,
			co2: 420,
		},
		air: {
			kualitas: "baik",
			tekanan: 2.5,
			statusFilter: "bersih",
		},
		energi: {
			konsumsi: 3.2,
			surya: 2.1,
			grid: 1.1,
			penghematan: 150000,
		},
		kalenderTanam: [
			{ rak: "A", tanaman: "Selada", hari: 15, totalHari: 30 },
			{ rak: "B", tanaman: "Bayam", hari: 8, totalHari: 25 },
			{ rak: "C", tanaman: "Kangkung", hari: 22, totalHari: 28 },
		],
		prediksi: {
			panenEstimasi: "12 hari",
			risikoLevel: "rendah",
			maintenanceNext: "5 hari",
		},
	});

	const [controls, setControls] = useState({
		pompa: false,
		lampu: false,
		valve: true,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setData((prev) => ({
				...prev,
				nutrisi: {
					...prev.nutrisi,
					ppm: prev.nutrisi.ppm + (Math.random() - 0.5) * 10,
				},
				lingkungan: {
					...prev.lingkungan,
					suhuUdara: prev.lingkungan.suhuUdara + (Math.random() - 0.5) * 2,
				},
			}));
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	const toggleControl = (device: ControlDevice) => {
		setControls((prev) => ({
			...prev,
			[device]: !prev[device],
		}));
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "optimal":
			case "baik":
			case "bersih":
				return "text-green-500";
			case "warning":
				return "text-yellow-500";
			case "danger":
				return "text-red-500";
			default:
				return "text-gray-500";
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4 md:p-8 pb-24">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
						Smart AeroFarm
					</h1>
					<p className="text-gray-600">
						Bojongsoang Vertical Farming Control Center
					</p>
					<div className="flex items-center gap-2 mt-2">
						<Activity className="w-4 h-4 text-green-500 animate-pulse" />
						<span className="text-sm text-green-600 font-medium">Sistem Aktif</span>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Kondisi Nutrisi
							</h3>
							<Droplets className="w-6 h-6 text-blue-500" />
						</div>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-1">
									<span className="text-sm text-gray-600">PPM</span>
									<span className="text-sm font-bold text-blue-600">
										{data.nutrisi.ppm.toFixed(0)}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${(data.nutrisi.ppm / 1200) * 100}%` }}
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-blue-50 rounded-lg p-3">
									<p className="text-xs text-gray-600">pH</p>
									<p className="text-xl font-bold text-blue-700">
										{data.nutrisi.ph}
									</p>
								</div>
								<div className="bg-blue-50 rounded-lg p-3">
									<p className="text-xs text-gray-600">Suhu Air</p>
									<p className="text-xl font-bold text-blue-700">
										{data.nutrisi.suhuAir}°C
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-4 h-4 text-green-500" />
								<span
									className={`text-sm font-medium ${getStatusColor(
										data.nutrisi.status
									)}`}>
									Status: {data.nutrisi.status.toUpperCase()}
								</span>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">Lingkungan</h3>
							<Thermometer className="w-6 h-6 text-orange-500" />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-orange-50 rounded-lg p-3">
								<div className="flex items-center gap-2 mb-1">
									<Thermometer className="w-4 h-4 text-orange-600" />
									<p className="text-xs text-gray-600">Suhu</p>
								</div>
								<p className="text-xl font-bold text-orange-700">
									{data.lingkungan.suhuUdara.toFixed(1)}°C
								</p>
							</div>
							<div className="bg-blue-50 rounded-lg p-3">
								<div className="flex items-center gap-2 mb-1">
									<Droplets className="w-4 h-4 text-blue-600" />
									<p className="text-xs text-gray-600">Kelembapan</p>
								</div>
								<p className="text-xl font-bold text-blue-700">
									{data.lingkungan.kelembapan}%
								</p>
							</div>
							<div className="bg-yellow-50 rounded-lg p-3">
								<div className="flex items-center gap-2 mb-1">
									<Sun className="w-4 h-4 text-yellow-600" />
									<p className="text-xs text-gray-600">Cahaya</p>
								</div>
								<p className="text-xl font-bold text-yellow-700">
									{data.lingkungan.cahaya}%
								</p>
							</div>
							<div className="bg-green-50 rounded-lg p-3">
								<div className="flex items-center gap-2 mb-1">
									<Wind className="w-4 h-4 text-green-600" />
									<p className="text-xs text-gray-600">CO₂</p>
								</div>
								<p className="text-xl font-bold text-green-700">
									{data.lingkungan.co2} ppm
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">Sistem Air</h3>
							<Droplets className="w-6 h-6 text-cyan-500" />
						</div>
						<div className="space-y-4">
							<div className="bg-cyan-50 rounded-lg p-4">
								<p className="text-sm text-gray-600 mb-2">Kualitas Air</p>
								<div className="flex items-center justify-between">
									<span
										className={`text-lg font-bold ${getStatusColor(
											data.air.kualitas
										)}`}>
										{data.air.kualitas.toUpperCase()}
									</span>
									<CheckCircle className="w-5 h-5 text-green-500" />
								</div>
							</div>
							<div className="bg-cyan-50 rounded-lg p-4">
								<p className="text-sm text-gray-600 mb-1">Tekanan</p>
								<p className="text-2xl font-bold text-cyan-700">
									{data.air.tekanan} bar
								</p>
							</div>
							<div className="bg-cyan-50 rounded-lg p-4">
								<p className="text-sm text-gray-600 mb-1">Status Filter</p>
								<p
									className={`text-lg font-bold ${getStatusColor(
										data.air.statusFilter
									)}`}>
									{data.air.statusFilter.toUpperCase()}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Kontrol Cepat
							</h3>
							<Power className="w-6 h-6 text-purple-500" />
						</div>
						<div className="space-y-3">
							{Object.entries(controls).map(([device, isOn]) => (
								<button
									key={device}
									onClick={() => toggleControl(device as ControlDevice)}
									className={`w-full p-4 rounded-xl font-medium transition-all ${
										isOn
											? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}>
									<div className="flex items-center justify-between">
										<span className="capitalize">{device}</span>
										<div
											className={`w-12 h-6 rounded-full transition-colors ${
												isOn ? "bg-white/30" : "bg-gray-300"
											} relative`}>
											<div
												className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
													isOn ? "translate-x-6" : "translate-x-0.5"
												}`}
											/>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Optimasi Energi
							</h3>
							<Zap className="w-6 h-6 text-yellow-500" />
						</div>
						<div className="space-y-4">
							<div className="relative pt-1">
								<div className="flex mb-2 items-center justify-between">
									<div>
										<span className="text-xs font-semibold inline-block text-yellow-600">
											Surya
										</span>
									</div>
									<div>
										<span className="text-xs font-semibold inline-block text-yellow-600">
											{data.energi.surya} kWh
										</span>
									</div>
								</div>
								<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
									<div
										style={{
											width: `${
												(data.energi.surya / data.energi.konsumsi) * 100
											}%`,
										}}
										className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div className="bg-yellow-50 rounded-lg p-3">
									<p className="text-xs text-gray-600">Konsumsi</p>
									<p className="text-lg font-bold text-yellow-700">
										{data.energi.konsumsi} kWh
									</p>
								</div>
								<div className="bg-gray-50 rounded-lg p-3">
									<p className="text-xs text-gray-600">Grid</p>
									<p className="text-lg font-bold text-gray-700">
										{data.energi.grid} kWh
									</p>
								</div>
							</div>

							<div className="bg-green-50 rounded-lg p-4">
								<p className="text-xs text-gray-600 mb-1">
									Penghematan Bulan Ini
								</p>
								<p className="text-2xl font-bold text-green-700">
									Rp {data.energi.penghematan.toLocaleString("id-ID")}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Kalender Tanam
							</h3>
							<Calendar className="w-6 h-6 text-green-500" />
						</div>
						<div className="space-y-3">
							{data.kalenderTanam.map((item) => (
								<div key={item.rak} className="bg-green-50 rounded-lg p-4">
									<div className="flex justify-between items-center mb-2">
										<span className="font-semibold text-green-800">
											Rak {item.rak}
										</span>
										<span className="text-sm text-gray-600">
											{item.tanaman}
										</span>
									</div>
									<div className="w-full bg-green-200 rounded-full h-2 mb-2">
										<div
											className="bg-green-600 h-2 rounded-full transition-all"
											style={{
												width: `${(item.hari / item.totalHari) * 100}%`,
											}}
										/>
									</div>
									<p className="text-xs text-gray-600">
										Hari {item.hari} dari {item.totalHari}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Prediksi & Analitik
							</h3>
							<TrendingUp className="w-6 h-6 text-indigo-500" />
						</div>
						<div className="space-y-4">
							<div className="bg-indigo-50 rounded-lg p-4">
								<div className="flex items-center gap-2 mb-2">
									<Calendar className="w-4 h-4 text-indigo-600" />
									<p className="text-sm text-gray-600">Estimasi Panen</p>
								</div>
								<p className="text-2xl font-bold text-indigo-700">
									{data.prediksi.panenEstimasi}
								</p>
							</div>

							<div className="bg-green-50 rounded-lg p-4">
								<div className="flex items-center gap-2 mb-2">
									<CheckCircle className="w-4 h-4 text-green-600" />
									<p className="text-sm text-gray-600">Risiko Penyakit</p>
								</div>
								<p
									className={`text-lg font-bold ${getStatusColor(
										data.prediksi.risikoLevel
									)}`}>
									{data.prediksi.risikoLevel.toUpperCase()}
								</p>
							</div>

							<div className="bg-orange-50 rounded-lg p-4">
								<div className="flex items-center gap-2 mb-2">
									<Clock className="w-4 h-4 text-orange-600" />
									<p className="text-sm text-gray-600">
										Maintenance Berikutnya
									</p>
								</div>
								<p className="text-lg font-bold text-orange-700">
									{data.prediksi.maintenanceNext}
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Diagnosa Tanaman
							</h3>
							<Leaf className="w-6 h-6 text-emerald-500" />
						</div>
						<div className="space-y-4">
							<button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4 rounded-xl font-medium hover:shadow-lg transition-all">
								Scan Tanaman
							</button>

							<div className="bg-emerald-50 rounded-lg p-4">
								<p className="text-sm text-gray-600 mb-2">Status Terakhir</p>
								<div className="flex items-center gap-2">
									<CheckCircle className="w-5 h-5 text-green-500" />
									<span className="font-medium text-green-700">
										Semua Tanaman Sehat
									</span>
								</div>
							</div>
						</div>
					</div>


					<div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition-shadow">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">Marketplace</h3>
							<ShoppingCart className="w-6 h-6 text-pink-500" />
						</div>
						<div className="space-y-4">
							<div className="bg-pink-50 rounded-lg p-4">
								<p className="text-sm text-gray-600 mb-1">
									Harga Pasar Hari Ini
								</p>
								<p className="text-sm text-pink-800 font-medium">
									Selada: Rp 25.000/kg
								</p>
								<p className="text-sm text-pink-800 font-medium">
									Bayam: Rp 18.000/kg
								</p>
							</div>
							<button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all">
								Jual Hasil Panen
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
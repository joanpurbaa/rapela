import React, { useState } from "react";
import {
	Sprout,
	Plus,
	Settings,
	RotateCcw,
	TrendingUp,
	AlertCircle,
} from "lucide-react";

type PlantPhase = "bibit" | "vegetatif" | "berbunga" | "panen";

interface NewPlant {
	rak: string;
	tanaman: string;
	fase: PlantPhase;
	tanggalTanam: string;
}

interface PlantSchedule {
	id: string;
	rak: string;
	tanaman: string;
	fase: "bibit" | "vegetatif" | "berbunga" | "panen";
	tanggalTanam: string;
	estimasiPanen: string;
	progress: number;
	kesehatan: "baik" | "warning" | "kritis";
}

const PlantManagement: React.FC = () => {
	const [schedules, setSchedules] = useState<PlantSchedule[]>([
		{
			id: "1",
			rak: "A",
			tanaman: "Selada",
			fase: "vegetatif",
			tanggalTanam: "2024-01-15",
			estimasiPanen: "2024-02-15",
			progress: 50,
			kesehatan: "baik",
		},
		{
			id: "2",
			rak: "B",
			tanaman: "Bayam",
			fase: "bibit",
			tanggalTanam: "2024-01-20",
			estimasiPanen: "2024-02-14",
			progress: 20,
			kesehatan: "baik",
		},
		{
			id: "3",
			rak: "C",
			tanaman: "Kangkung",
			fase: "panen",
			tanggalTanam: "2024-01-05",
			estimasiPanen: "2024-01-28",
			progress: 90,
			kesehatan: "warning",
		},
		{
			id: "4",
			rak: "D",
			tanaman: "Pakcoy",
			fase: "vegetatif",
			tanggalTanam: "2024-01-18",
			estimasiPanen: "2024-02-12",
			progress: 60,
			kesehatan: "baik",
		},
	]);

	const [showAddForm, setShowAddForm] = useState(false);
	const [newPlant, setNewPlant] = useState<NewPlant>({
		rak: "",
		tanaman: "",
		fase: "bibit",
		tanggalTanam: "",
	});

	const getFaseColor = (fase: string) => {
		switch (fase) {
			case "bibit":
				return "bg-blue-100 text-blue-800";
			case "vegetatif":
				return "bg-green-100 text-green-800";
			case "berbunga":
				return "bg-purple-100 text-purple-800";
			case "panen":
				return "bg-orange-100 text-orange-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getKesehatanColor = (kesehatan: string) => {
		switch (kesehatan) {
			case "baik":
				return "text-green-500";
			case "warning":
				return "text-yellow-500";
			case "kritis":
				return "text-red-500";
			default:
				return "text-gray-500";
		}
	};

	const addNewSchedule = () => {
		const newSchedule: PlantSchedule = {
			id: Date.now().toString(),
			...newPlant,
			estimasiPanen: "2024-02-20",
			progress: 0,
			kesehatan: "baik",
		};
		setSchedules([...schedules, newSchedule]);
		setShowAddForm(false);
		setNewPlant({ rak: "", tanaman: "", fase: "bibit", tanggalTanam: "" });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 p-4 md:p-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-emerald-800 mb-2">
					Plant Management
				</h1>
				<p className="text-gray-600">
					Kelola rotasi tanaman dan siklus tanam cerdas
				</p>
				<div className="flex items-center gap-2 mt-2">
					<Sprout className="w-4 h-4 text-emerald-500" />
					<span className="text-sm text-emerald-600 font-medium">
						Active Plants: {schedules.length}
					</span>
				</div>
			</div>

			<div className="flex gap-4 mb-6">
				<button
					onClick={() => setShowAddForm(true)}
					className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
					<Plus className="w-4 h-4" />
					Tambah Tanaman Baru
				</button>
				<button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
					<RotateCcw className="w-4 h-4" />
					Rotasi Otomatis
				</button>
			</div>

			{showAddForm && (
				<div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-emerald-100">
					<h3 className="text-lg font-semibold text-gray-800 mb-4">
						Tambah Tanaman Baru
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<input
							type="text"
							placeholder="Rak"
							value={newPlant.rak}
							onChange={(e) => setNewPlant({ ...newPlant, rak: e.target.value })}
							className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
						<select
							value={newPlant.tanaman}
							onChange={(e) => setNewPlant({ ...newPlant, tanaman: e.target.value })}
							className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
							<option value="">Pilih Tanaman</option>
							<option value="Selada">Selada</option>
							<option value="Bayam">Bayam</option>
							<option value="Kangkung">Kangkung</option>
							<option value="Pakcoy">Pakcoy</option>
							<option value="Basil">Basil</option>
						</select>
						<select
							value={newPlant.fase}
							onChange={(e) =>
								setNewPlant({ ...newPlant, fase: e.target.value as PlantPhase })
							}
							className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
							<option value="bibit">Bibit</option>
							<option value="vegetatif">Vegetatif</option>
							<option value="berbunga">Berbunga</option>
						</select>
						<input
							type="date"
							value={newPlant.tanggalTanam}
							onChange={(e) =>
								setNewPlant({ ...newPlant, tanggalTanam: e.target.value })
							}
							className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
						/>
					</div>
					<div className="flex gap-2 mt-4">
						<button
							onClick={addNewSchedule}
							className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
							Simpan
						</button>
						<button
							onClick={() => setShowAddForm(false)}
							className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors">
							Batal
						</button>
					</div>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{schedules.map((schedule) => (
					<div
						key={schedule.id}
						className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-shadow">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Rak {schedule.rak}
							</h3>
							<div className="flex items-center gap-2">
								<AlertCircle
									className={`w-4 h-4 ${getKesehatanColor(schedule.kesehatan)}`}
								/>
								<span
									className={`text-sm font-medium ${getKesehatanColor(
										schedule.kesehatan
									)}`}>
									{schedule.kesehatan.toUpperCase()}
								</span>
							</div>
						</div>

						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-emerald-700">
									{schedule.tanaman}
								</span>
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${getFaseColor(
										schedule.fase
									)}`}>
									{schedule.fase.toUpperCase()}
								</span>
							</div>

							<div className="w-full bg-gray-200 rounded-full h-3">
								<div
									className="bg-emerald-500 h-3 rounded-full transition-all"
									style={{ width: `${schedule.progress}%` }}
								/>
							</div>
							<p className="text-sm text-gray-600 text-center">
								Progress: {schedule.progress}%
							</p>

							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="bg-emerald-50 rounded-lg p-3">
									<p className="text-gray-600">Tanggal Tanam</p>
									<p className="font-semibold text-emerald-700">
										{schedule.tanggalTanam}
									</p>
								</div>
								<div className="bg-orange-50 rounded-lg p-3">
									<p className="text-gray-600">Estimasi Panen</p>
									<p className="font-semibold text-orange-700">
										{schedule.estimasiPanen}
									</p>
								</div>
							</div>

							<div className="flex gap-2">
								<button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm">
									<Settings className="w-4 h-4 inline mr-1" />
									Atur
								</button>
								<button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
									<TrendingUp className="w-4 h-4 inline mr-1" />
									Progress
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PlantManagement;

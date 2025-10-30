import React, { useState } from "react";
import {
	TrendingUp,
	Package,
	DollarSign,
	BarChart3,
	Download,
	Search,
} from "lucide-react";

interface SaleRecord {
	id: string;
	tanggal: string;
	produk: string;
	jumlah: number;
	satuan: string;
	harga: number;
	total: number;
	pembeli: string;
	status: "completed" | "pending" | "cancelled";
}

interface PerformanceMetric {
	bulan: string;
	penjualan: number;
	tanaman: number;
	pendapatan: number;
	growth: number;
}

const TrackRecord: React.FC = () => {
	const [salesData, ] = useState<SaleRecord[]>([
		{
			id: "1",
			tanggal: "2024-01-15",
			produk: "Selada",
			jumlah: 50,
			satuan: "kg",
			harga: 25000,
			total: 1250000,
			pembeli: "Toko Sayur Segar",
			status: "completed",
		},
		{
			id: "2",
			tanggal: "2024-01-12",
			produk: "Bayam",
			jumlah: 30,
			satuan: "kg",
			harga: 18000,
			total: 540000,
			pembeli: "Pasar Modern",
			status: "completed",
		},
		{
			id: "3",
			tanggal: "2024-01-10",
			produk: "Kangkung",
			jumlah: 40,
			satuan: "kg",
			harga: 15000,
			total: 600000,
			pembeli: "Restoran Hijau",
			status: "completed",
		},
		{
			id: "4",
			tanggal: "2024-01-08",
			produk: "Pakcoy",
			jumlah: 25,
			satuan: "kg",
			harga: 22000,
			total: 550000,
			pembeli: "Supermarket Indah",
			status: "completed",
		},
		{
			id: "5",
			tanggal: "2024-01-05",
			produk: "Selada",
			jumlah: 35,
			satuan: "kg",
			harga: 25000,
			total: 875000,
			pembeli: "Hotel Grand",
			status: "completed",
		},
	]);

	const [performanceData, ] = useState<PerformanceMetric[]>([
		{
			bulan: "Jan 2024",
			penjualan: 180,
			tanaman: 4,
			pendapatan: 3815000,
			growth: 12,
		},
		{
			bulan: "Des 2023",
			penjualan: 160,
			tanaman: 4,
			pendapatan: 3400000,
			growth: 8,
		},
		{
			bulan: "Nov 2023",
			penjualan: 148,
			tanaman: 3,
			pendapatan: 3150000,
			growth: 5,
		},
		{
			bulan: "Okt 2023",
			penjualan: 142,
			tanaman: 3,
			pendapatan: 3000000,
			growth: -2,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");

	const filteredSales = salesData.filter(
		(sale) =>
			sale.produk.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(filterStatus === "all" || sale.status === filterStatus)
	);

	const totalPendapatan = salesData.reduce((sum, sale) => sum + sale.total, 0);
	const totalPenjualan = salesData.reduce((sum, sale) => sum + sale.jumlah, 0);
	const produkTerjual = new Set(salesData.map((sale) => sale.produk)).size;

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800";
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const exportToCSV = () => {
		const headers = [
			"Tanggal",
			"Produk",
			"Jumlah",
			"Satuan",
			"Harga",
			"Total",
			"Pembeli",
			"Status",
		];
		const csvData = salesData.map((sale) => [
			sale.tanggal,
			sale.produk,
			sale.jumlah,
			sale.satuan,
			sale.harga,
			sale.total,
			sale.pembeli,
			sale.status,
		]);

		const csvContent = [headers, ...csvData]
			.map((row) => row.join(","))
			.join("\n");

		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "track-record-penjualan.csv";
		a.click();
		window.URL.revokeObjectURL(url);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 md:p-8 pb-20">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-amber-800 mb-2">Track Record</h1>
				<p className="text-gray-600">
					Riwayat penjualan dan performa tanaman yang sudah terjual
				</p>
				<div className="flex items-center gap-2 mt-2">
					<TrendingUp className="w-4 h-4 text-amber-500" />
					<span className="text-sm text-amber-600 font-medium">
						Data Real-time Penjualan
					</span>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Total Pendapatan</p>
							<p className="text-3xl font-bold text-green-700">
								Rp {totalPendapatan.toLocaleString("id-ID")}
							</p>
						</div>
						<DollarSign className="w-8 h-8 text-green-500" />
					</div>
					<p className="text-xs text-gray-500 mt-2">Seluruh periode</p>
				</div>

				<div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Total Penjualan</p>
							<p className="text-3xl font-bold text-blue-700">{totalPenjualan} kg</p>
						</div>
						<Package className="w-8 h-8 text-blue-500" />
					</div>
					<p className="text-xs text-gray-500 mt-2">{salesData.length} transaksi</p>
				</div>

				<div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600">Jenis Produk Terjual</p>
							<p className="text-3xl font-bold text-purple-700">{produkTerjual}</p>
						</div>
						<BarChart3 className="w-8 h-8 text-purple-500" />
					</div>
					<p className="text-xs text-gray-500 mt-2">Variasi tanaman</p>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Performance Metrics */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-800">Performa Bulanan</h3>
							<TrendingUp className="w-6 h-6 text-indigo-500" />
						</div>
						<div className="space-y-4">
							{performanceData.map((metric, index) => (
								<div key={index} className="bg-indigo-50 rounded-lg p-4">
									<div className="flex justify-between items-center mb-2">
										<span className="font-semibold text-indigo-800">{metric.bulan}</span>
										<span
											className={`text-sm font-bold ${
												metric.growth >= 0 ? "text-green-600" : "text-red-600"
											}`}>
											{metric.growth >= 0 ? "+" : ""}
											{metric.growth}%
										</span>
									</div>
									<div className="grid grid-cols-2 gap-2 text-sm">
										<div>
											<p className="text-gray-600">Penjualan</p>
											<p className="font-semibold">{metric.penjualan} kg</p>
										</div>
										<div>
											<p className="text-gray-600">Pendapatan</p>
											<p className="font-semibold">
												Rp {metric.pendapatan.toLocaleString("id-ID")}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Sales Records */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Data Yang Sudah Dijual
							</h3>

							<div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
								<div className="relative">
									<Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="Cari produk..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
									/>
								</div>

								<select
									value={filterStatus}
									onChange={(e) => setFilterStatus(e.target.value)}
									className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
									<option value="all">Semua Status</option>
									<option value="completed">Selesai</option>
									<option value="pending">Pending</option>
									<option value="cancelled">Dibatalkan</option>
								</select>

								<button
									onClick={exportToCSV}
									className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
									<Download className="w-4 h-4" />
									Export
								</button>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Tanggal
										</th>
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Produk
										</th>
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Jumlah
										</th>
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Harga
										</th>
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Total
										</th>
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Pembeli
										</th>
										<th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredSales.map((sale) => (
										<tr
											key={sale.id}
											className="border-b border-gray-100 hover:bg-gray-50">
											<td className="py-3 px-4 text-sm">{sale.tanggal}</td>
											<td className="py-3 px-4 text-sm font-medium">{sale.produk}</td>
											<td className="py-3 px-4 text-sm">
												{sale.jumlah} {sale.satuan}
											</td>
											<td className="py-3 px-4 text-sm">
												Rp {sale.harga.toLocaleString("id-ID")}
											</td>
											<td className="py-3 px-4 text-sm font-semibold text-green-700">
												Rp {sale.total.toLocaleString("id-ID")}
											</td>
											<td className="py-3 px-4 text-sm text-gray-600">{sale.pembeli}</td>
											<td className="py-3 px-4 text-sm">
												<span
													className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
														sale.status
													)}`}>
													{sale.status === "completed"
														? "Selesai"
														: sale.status === "pending"
														? "Pending"
														: "Dibatalkan"}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>

							{filteredSales.length === 0 && (
								<div className="text-center py-8 text-gray-500">
									Tidak ada data penjualan yang sesuai dengan filter
								</div>
							)}
						</div>

						<div className="mt-4 flex justify-between items-center text-sm text-gray-600">
							<span>
								Menampilkan {filteredSales.length} dari {salesData.length} transaksi
							</span>
							<span>Terakhir update: {new Date().toLocaleDateString("id-ID")}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrackRecord;

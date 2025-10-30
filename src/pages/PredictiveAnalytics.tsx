import React, { useState } from "react";
import {
    TrendingUp,
    Calendar,
    AlertTriangle,
    Clock,
    BarChart3,
    Download,
} from "lucide-react";

interface AnalyticsData {
    panenPredictions: {
        tanaman: string;
        rak: string;
        estimasiPanen: string;
        confidence: number;
        optimalPanen: boolean;
    }[];
    riskAssessments: {
        jenis: string;
        level: "rendah" | "sedang" | "tinggi";
        probabilitas: number;
        dampak: string;
        rekomendasi: string;
    }[];
    maintenanceSchedule: {
        peralatan: string;
        jenis: string;
        terakhir: string;
        berikutnya: string;
        status: "optimal" | "warning" | "critical";
    }[];
    energyTrends: {
        tanggal: string;
        konsumsi: number;
        produksi: number;
        efisiensi: number;
    }[];
}

const PredictiveAnalytics: React.FC = () => {
    const [data] = useState<AnalyticsData>({
        panenPredictions: [
            { tanaman: "Selada", rak: "A", estimasiPanen: "12 hari", confidence: 85, optimalPanen: true },
            { tanaman: "Bayam", rak: "B", estimasiPanen: "17 hari", confidence: 78, optimalPanen: true },
            { tanaman: "Kangkung", rak: "C", estimasiPanen: "6 hari", confidence: 92, optimalPanen: false },
        ],
        riskAssessments: [
            { jenis: "Jamur", level: "rendah", probabilitas: 15, dampak: "Kerusakan daun", rekomendasi: "Pertahankan sirkulasi udara" },
            { jenis: "Hama", level: "sedang", probabilitas: 45, dampak: "Kerusakan tanaman", rekomendasi: "Monitor intensif, siapkan pestisida organik" },
            { jenis: "Defisiensi Nutrisi", level: "rendah", probabilitas: 20, dampak: "Pertumbuhan lambat", rekomendasi: "Cek level PPM secara berkala" },
        ],
        maintenanceSchedule: [
            { peralatan: "Pompa Nutrisi A", jenis: "Pompa", terakhir: "2024-01-15", berikutnya: "2024-02-15", status: "optimal" },
            { peralatan: "Filter Air Utama", jenis: "Filter", terakhir: "2024-01-10", berikutnya: "2024-01-25", status: "warning" },
            { peralatan: "Sensor PH", jenis: "Sensor", terakhir: "2024-01-18", berikutnya: "2024-02-18", status: "optimal" },
        ],
        energyTrends: [
            { tanggal: "Sen", konsumsi: 3.2, produksi: 2.1, efisiensi: 65 },
            { tanggal: "Sel", konsumsi: 3.1, produksi: 2.3, efisiensi: 74 },
            { tanggal: "Rab", konsumsi: 3.4, produksi: 1.8, efisiensi: 53 },
            { tanggal: "Kam", konsumsi: 3.0, produksi: 2.5, efisiensi: 83 },
            { tanggal: "Jum", konsumsi: 3.3, produksi: 2.2, efisiensi: 66 },
        ],
    });

    const getRiskColor = (level: string) => {
        switch (level) {
            case "rendah": return "text-green-500";
            case "sedang": return "text-yellow-500";
            case "tinggi": return "text-red-500";
            default: return "text-gray-500";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "optimal": return "text-green-500";
            case "warning": return "text-yellow-500";
            case "critical": return "text-red-500";
            default: return "text-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 pb-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
                        Predictive Analytics
                    </h1>
                    <p className="text-gray-600">
                        Analisis prediktif dan perencanaan maintenance cerdas
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <BarChart3 className="w-4 h-4 text-indigo-500 animate-pulse" />
                        <span className="text-sm text-indigo-600 font-medium">
                            AI Predictive Model Active
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Prediksi Panen</h3>
                            <Calendar className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="space-y-4">
                            {data.panenPredictions.map((prediction, index) => (
                                <div key={index} className="bg-green-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-green-800">
                                            {prediction.tanaman}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            Rak {prediction.rak}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-2xl font-bold text-green-700">
                                            {prediction.estimasiPanen}
                                        </span>
                                        <div
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                prediction.optimalPanen
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {prediction.optimalPanen ? "Optimal" : "Perlu Perhatian"}
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full transition-all"
                                            style={{ width: `${prediction.confidence}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Confidence: {prediction.confidence}%
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Risk Assessment
                            </h3>
                            <AlertTriangle className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="space-y-4">
                            {data.riskAssessments.map((risk, index) => (
                                <div key={index} className="bg-orange-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-orange-800">
                                            {risk.jenis}
                                        </span>
                                        <span className={`font-bold ${getRiskColor(risk.level)}`}>
                                            {risk.level.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">
                                            Probabilitas: {risk.probabilitas}%
                                        </span>
                                        <span className="text-sm text-gray-600">{risk.dampak}</span>
                                    </div>
                                    <p className="text-sm text-orange-700">{risk.rekomendasi}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Jadwal Maintenance
                            </h3>
                            <Clock className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="space-y-4">
                            {data.maintenanceSchedule.map((item, index) => (
                                <div key={index} className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-blue-800">
                                            {item.peralatan}
                                        </span>
                                        <span
                                            className={`font-bold ${getStatusColor(item.status)}`}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="text-gray-600">Terakhir</p>
                                            <p className="font-medium">{item.terakhir}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Berikutnya</p>
                                            <p className="font-medium">{item.berikutnya}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Trend Energi</h3>
                            <TrendingUp className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className="space-y-3">
                            {data.energyTrends.map((trend, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                    <span className="font-medium text-purple-800">
                                        {trend.tanggal}
                                    </span>
                                    <div className="flex gap-4">
                                        <span className="text-sm text-gray-600">
                                            {trend.konsumsi}kWh
                                        </span>
                                        <span className="text-sm text-green-600">
                                            {trend.produksi}kWh
                                        </span>
                                        <span className="text-sm font-bold text-purple-600">
                                            {trend.efisiensi}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Export Laporan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictiveAnalytics;
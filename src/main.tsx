import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const PredictiveAnalytics = lazy(() => import("./pages/PredictiveAnalytics"));
const PlantManagement = lazy(() => import("./pages/PlantManagement"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Navigation = lazy(() => import("./components/Navigation"));
const TrackRecord = lazy(() => import("./pages/TrackRecord"));

export const LoadingSpinner = () => (
	<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
		<div className="text-center">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
			<p className="mt-4 text-green-600 font-medium">Loading Smart AeroFarm...</p>
		</div>
	</div>
);

export const App = () => {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50">
				<Suspense fallback={<LoadingSpinner />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/analytics" element={<PredictiveAnalytics />} />
						<Route path="/plants" element={<PlantManagement />} />
						<Route path="/marketplace" element={<Marketplace />} />
						<Route path="/track-record" element={<TrackRecord />} />
					</Routes>
					<Navigation />
				</Suspense>
			</div>
		</Router>
	);
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

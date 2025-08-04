// frontend/src/utils/api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // http://localhost:8000/api

export async function fetchHistoricalData() {
    try {
        const response = await fetch(`${BASE_URL}/historical-data`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch historical data");

        return await response.json();
    } catch (error) {
        console.error("Error fetching historical data:", error);
        throw error;
    }
}

export async function fetchPredictions() {
    try {
        const response = await fetch(`${BASE_URL}/predictions`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch predictions");

        return await response.json();
    } catch (error) {
        console.error("Error fetching predictions:", error);
        throw error;
    }
}

// Fungsi untuk mereset simulasi, menggunakan BASE_URL
export async function resetSimulation() {
    try {
        const response = await fetch(`${BASE_URL}/reset-simulation`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Gagal mereset simulasi");
        }
        console.log("Simulasi berhasil direset.");
    } catch (error) {
        console.error("Error saat mereset simulasi:", error);
        throw error; // Penting: Melempar error agar bisa ditangkap di komponen React
    }
}
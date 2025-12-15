import apiHandler from "./apiHandler";

class TripService {
    async getTrips() {
        return await apiHandler("/admin/trips");
    }

    async getTrip(id) {
        return await apiHandler(`/admin/trip/${id}`);
    }

    async createTrip(data) {
        return await apiHandler("/admin/trip", "POST", data);
    }

    async updateTripStatus(id, status, km) {
        const payload = { status };
        if (km) payload.km = km;
        return await apiHandler(`/admin/trip/${id}/status`, "PUT", payload);
    }
}

export default new TripService();

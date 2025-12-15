import apiHandler from "./apiHandler";

class DriverService {
    async getMyTrips() {
        return await apiHandler("/admin/my-trips");
    }

    async getTripDetail(id) {
        return await apiHandler(`/admin/trip/${id}`);
    }

    async updateStatus(id, status, km, fuelRefillLitres = null, remarks = null) {
        return await apiHandler(`/admin/trip/${id}/status`, "PUT", { status, km, fuelRefillLitres, remarks });
    }

    async getDrivers() {
        return await apiHandler("/auth/drivers");
    }
}

export default new DriverService();

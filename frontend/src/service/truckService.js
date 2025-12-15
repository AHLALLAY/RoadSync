import apiHandler from "./apiHandler";

class TruckService {
    async getTrucks() {
        return await apiHandler("/admin/trucks");
    }

    async getTruck(id) {
        return await apiHandler(`/admin/truck/${id}`);
    }

    async createTruck(data) {
        return await apiHandler("/admin/truck", "POST", data);
    }

    async updateTruck(id, data) {
        return await apiHandler(`/admin/truck/${id}`, "PUT", data);
    }

    async deleteTruck(id) {
        return await apiHandler(`/admin/truck/${id}`, "DELETE");
    }
}

export default new TruckService();

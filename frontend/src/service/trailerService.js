import apiHandler from "./apiHandler";

class TrailerService {
    async getTrailers() {
        return await apiHandler("/admin/trailers");
    }

    async getTrailer(id) {
        return await apiHandler(`/admin/trailer/${id}`);
    }

    async createTrailer(data) {
        return await apiHandler("/admin/trailer", "POST", data);
    }

    async updateTrailer(id, data) {
        return await apiHandler(`/admin/trailer/${id}`, "PUT", data);
    }

    async deleteTrailer(id) {
        return await apiHandler(`/admin/trailer/${id}`, "DELETE");
    }
}

export default new TrailerService();

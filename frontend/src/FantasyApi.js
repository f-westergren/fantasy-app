import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class FantasyApi {
	static async request(endpoint, paramsOrData = {}, verb = 'get') {
		paramsOrData._token = localStorage.getItem('token');

		try {
			return (await axios({
				method: verb,
				url: `${BASE_URL}/${endpoint}`,
				[verb === 'get' ? 'params' : 'data']: paramsOrData
			})).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	static async login(email, password) {
		const res = await this.request('login', { email, password }, 'post');
		return res;
	}

	static async getUser(id) {
		const res = await this.request(`users/${id}`);
		return res;
	}

	static async createUser(data) {
		const res = await this.request('users', data, 'post');
		return res;
	}

	static async updateUser(id, data) {
		const res = await this.request(`users/${id}`, data, 'patch');
		return res;
	}

	static async deleteUser(id) {
		const res = await this.request(`users/${id}`, {}, 'delete');
		return res;
	}

	static async getGuide(id) {
		const res = await this.request(`guides/${id}`);
		return res.guide;
	}

	static async getGuides(data) {
		const res = await this.request('guides', data);
		return res;
	}

	static async registerGuide(data) {
		const res = await this.request('guides', data, 'post');
		return res;
	}

	static async updateGuide(id, data) {
		const res = await this.request(`guides/${id}`, data, 'patch');
		return res;
	}

	static async deleteGuide(id) {
		const res = await this.request(`guides/${id}`, {}, 'delete');
		return res;
	}

	static async getMessages() {
		const res = await this.request('messages');
		return res;
	}

	static async newMessage(data) {
		const res = await this.request('messages', data, 'post');
		return res;
	}

	static async getReservations() {
		const res = await this.request('reservations');
		return res;
	}

	static async newReservation(data) {
		const res = await this.request('reservations', data, 'post');
		return res;
	}

	static async updateReservation(res_id, data) {
		const res = await this.request(`reservations/${res_id}`, data, 'patch');
		return res;
	}

	static async deleteReservation(res_id) {
		const res = await this.request(`reservations/${res_id}`, {}, 'delete');
		return res;
	}

	static async getFavorites() {
		const res = await this.request('favorites');
		return res;
	}

	static async getFavorite(guide_id) {
		const res = await this.request(`favorites/${guide_id}`);
		return res;
	}

	static async newFavorite(guide_id) {
		const res = await this.request('favorites', { guide_id }, 'post');
		return res;
	}

	static async deleteFavorite(id) {
		const res = await this.request(`favorites/${id}`, {}, 'delete');
		return res;
	}

	static async getWeather(lat, lon) {
		const res = await this.request('weather/today', { lat, lon });
		return res;
	}
}

export default FantasyApi;

import axios from "axios";
import { Cookies } from 'react-cookie';



// let instance = axios.create({
//     withCredentials: true,
//     baseURL: "http://127.0.0.1:8000/",
//     headers: {
//         'Access-Control-Allow-Origin' : '*',
//         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
//         'Content-Type': 'application/json',  

//     }
// })

let instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
    }
})


export const commentsAPI = {
    async getComments() {
        let res = await instance.get(`comments/`);
        return res;
    },

    async getComment(id) {
        let res = await instance.get(`comments/${id}`);
        return res;
    },

    async createComment(comment) {
        let res = await instance.post(`comments/`, comment);
        return res;
    },

    async updateComment(id, comment) {
        let res = await instance.put(`comments/${id}`, comment);
        return res;
    },

    async deleteComment(id) {
        let res = await instance.delete(`comments/${id}`);
        return res;
    }
}

export const likesAPI = {
    async getLikes() {
        let res = await instance.get(`likes/`);
        return res;
    },

    async getLike(id) {
        let res = await instance.get(`likes/${id}`);
        return res;
    },

    async createLike(like) {
        let res = await instance.post(`likes/`, like);
        return res;
    },

    async updateLike(id, like) {
        let res = await instance.put(`likes/${id}`, like);
        return res;
    },

    async deleteLike(id) {
        let res = await instance.delete(`likes/${id}`);
        return res;
    }
}

export const tagsAPI = {
    async getTags() {
        let res = await instance.get(`tags/`);
        return res;
    },

    async getTag(id) {
        let res = await instance.get(`tags/${id}`);
        return res;

    },

    async createTag(tag) {
        let res = await instance.post(`tags/`, tag);
        return res;
    },

    async updateTag(id, tag) {
        let res = await instance.put(`tags/${id}`, tag);
        return res;
    },

    async deleteTag(id) {
        let res = await instance.delete(`tags/${id}`);
        return res;
    }
}

export const categoriesAPI = {
    async getCategories() {
        let res = await instance.get(`categories/`);
        return res;
    },

    async getCategory(id) {
        let res = await instance.get(`categories/${id}`);
        return res;
    },

    async createCategory(category) {
        let res = await instance.post(`categories/`, category);
        return res;
    },

    async updateCategory(id, category) {
        let res = await instance.put(`categories/${id}`, category);
        return res;
    },

    async deleteCategory(id) {
        let res = await instance.delete(`categories/${id}`);
        return res;
    }
}

export const imagesAPI = {
    async getImages() {
        let res = await instance.get(`images/`);
        return res;
    },

    async getImage(id) {
        let res = await instance.get(`images/${id}`);
        return res;
    },

    async createImage(image) {
        let res = await instance.post(`images/`, image);
        return res;
    },

    async updateImage(id, image) {
        let res = await instance.put(`images/${id}`, image);
        return res;
    },

    async deleteImage(id) {
        let res = await instance.delete(`images/${id}`);
        return res;

    }

}

export const eventsAPI = {

    async getEventsInHome({ pageSize, currentEvent }) {
        let res = await instance.get("getEventsInHome");
        return res;
    },

    async getEventsOfOrg({ id }) {
        let res = await instance.get(`getEventsOfOrg/${id}`);
        return res;
    },


}

export const eventAPI = {
    async getClickedEvent({ id }) {
        let res = await instance.get(`getClickedEvent/${id}`);
        return res;
    },

    async sendParticipation(data) {
        let res = await instance.post(`sendTheParticipation`, data);
        return res;
    },

    async sendEvent(data) {
        let res = await instance.post("http://127.0.0.1:8000/events/", data);
        return res;
    },

    async sendAccept(data) {
        let res = await instance.post(`sendAccept`, data);
        return res;
    },

    async sendAcceptAll(data) {
        const res = await instance.post('sendAccepAll', data);
        return res;
    },

    async sendComplete({ id }) {
        const res = await instance.put(`sendComplete/${id}`);
        return res;
    },

    async sendReject(data) {
        let res = await instance.post("sendReject", data);
        return res;
    },

    async sendView(data) {
        let res = await instance.post(`sendView`, data);
        return res;
    },

    async sendLike(data) {
        let res = await instance.post("sendLike", data);
        return res;
    },

    async sendDeleteLike({ like_id }) {
        let res = await instance.delete(`sendDeleteLike/${like_id}`);
        return res;
    }

}

export const notificationsAPI = {
    async getNotifications() {
        let res = await instance.get("getNotifications");
        return res;
    },
}

export const notificationAPI = {
    async getNotification({ id }) {
        let res = await instance.get(`/${id}`);
        return res;
    }
}

export const profileAPI = {
    async getProfileOfOrg({ id }) {
        let res = await instance.get(`getProfileOrg/${id}`);
        return res;
    },

    async getProfileOfVol({ id }) {
        let res = await instance.get(`getProfileOfVol/${id}`);
        return res;
    },

    async changeDescription({ id, data }) {
        let res = instance.put(`/changeDescriptionOfVol/${id}`, { description: data });
        return res;
    },

    async changeAva({ id, avatar }) {

        const formData = new FormData();
        formData.append('avatar', avatar);

        const access = Cookies.get("access");

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${access}`
            }
        };

        console.log(config)

        let res = await instance.put(`/changeAvaOfVol/${id}`, formData, config);
        return res;
    }


}

export const authAPI = {

    async register(userData) {
        let res = await instance.post(`^auth/users`, userData);
        return res;
    },

    async login(userData) {
        let res = await instance.post(`api/users/login`, userData);
        return res;
    },

    async me() {
        let res = await instance.get(`users/me`);
        return res;
    },

    async activate(data) {
        let res = await instance.post("^auth/users/activation", data);
        return res;
    },

    async verify() {
        let res = await instance.get("api/users/verify");
        return res;
    },

    async logout() {
        let res = await instance.get(`api/users/logout`);
        return res;
    },

}



// i have a proble with linking to rest api in django and i can't get token from server to my react app
// i tried to use axios, fetch, but it doesn't work
// can you write code for getting token from server to my react app?
// i will be very grateful to you
// thank you for your attention
// i hope you will help me
// i will wait for your answer
// thank you
// have a nice day
// bye
// i will wait for your answer

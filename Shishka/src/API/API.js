import axios from "axios";

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
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': 'application/json',
    }
})

export const usersAPI = {
    async getUsers() {
        let res = await instance.get(`users/`);
        return res;
    },

    async getUser(id) {
        let res = await instance.get(`users/${id}`);
        return res;
    },

    async updateUser(id, user) {
        let res = await instance.put(`users/${id}`, user);
        return res;
    },

    async deleteUser(id) {

        let res = await instance.delete(`users/${id}`);
        return res;
    }

}


export const postsAPI = {
    async getPosts() {
        let res = await instance.get(`posts/`);
        return res;
    },

    async getPost(id) {
        let res = await instance.get(`posts/${id}`);
        return res;
    },

    async createPost(post) {
        let res = await instance.post(`posts/`, post);
        return res;
    },

    async updatePost(id, post) {
        let res = await instance.put(`posts/${id}`, post);
        return res;
    },

    async deletePost(id) {
        let res = await instance.delete(`posts/${id}`);
        return res;
    }
}

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


export const authAPI = {
    
    async registerUser(userData) {
        console.log(userData)
        let res = await instance.post(`^auth/users`, userData);
        return res;
    },

    async login(userData) {
        console.log(userData)
        let res = await instance.post(`api/users/login`, userData);
        return res;
    },

    async logout() {
        let res = await instance.get(`^auth/users/logout`);
        return res;
    },
    async me() {
        let res = await instance.get(`users/me`);
        return res;
    },

    async checkAuth() {
        let res = await instance.get("");
        return res;
    },

    async verify(data) {
        let res = await instance.post("^auth/users/activation", data);
        console.log(res);
        return res;
    }


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

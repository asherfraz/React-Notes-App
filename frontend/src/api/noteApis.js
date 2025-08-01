import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

//** Notes Apis

export const createNote = async (data) => {
    try {
        const response = await api.post("/note/", data);
        return response;
    } catch (error) {
        return error;
    }
}


export const getNotes = async () => {
    try {
        const response = await api.get("/note/");
        return response;
    } catch (error) {
        return error;
    }
}
export const getNoteById = async (id) => {
    try {
        const response = await api.get(`/note/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}


export const modifyNote = async (id, data) => {
    try {
        const response = await api.patch(`/note/${id}`, data);
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteNote = async (id) => {
    try {
        const response = await api.delete(`/note/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";


function useUserActions() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;
    // const baseURL = "http://127.0.0.1:8000/api/v1";

    return {
        login,
        register,
        logout,
        edit,
        createRoom,
        getRooms
    };

    // Edit the user
    function edit(data, userId) {
        return axiosService.patch(`${baseURL}/user/${userId}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },}).then((res) => {
            // Registration the account in the store
            localStorage.setItem(
                "auth",
                JSON.stringify({access: getAccessToken(), refresh: getRefreshToken(), user: res.data,})
                
            );
        });
    }

    // Login the user
    function login(data) {
        return axios.post(`${baseURL}/login/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/main/");
        })
    }

    // Login the user
    function register(data) {
        return axios.post(`${baseURL}/register/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/main/");
        })
    }

    // Logout the user
    function logout() {
        return axiosService
            .post(`${baseURL}/logout/`, { refresh: getRefreshToken() })
            .then(() => {
                localStorage.removeItem("auth");
                navigate("/login/");
            });
    }

    // Create Room
    function createRoom(data) {
        return axiosService
            .post(`/room/`, data)
            .then((res) => {
                navigate(`/room/${res.data.id}/`);
            })
    }

    // Get Rooms
    function getRooms() {
        return axiosService.get('/room/')
            .then((response) => {
                // Проверяем, что ответ содержит данные и они представляют собой массив
                if (response.data.results && Array.isArray(response.data.results)) {
                    return response.data.results; // Возвращаем массив комнат из ответа
                } else {
                // Если данные не являются массивом, пробрасываем ошибку
                    throw new Error('Invalid response format: Rooms data is not an array.');
                }
            })
    }
}



// Get the user
function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    if (auth) {
        return auth.user;
    } else {
        return null;
    }
}

// Get the access token
function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.access;
}

// Get the refresh token
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
    localStorage.setItem("auth", JSON.stringify({
        access: data.access,
        refresh: data.refresh,
        user: data.user,
    }));
} 

export { useUserActions, getUser,  getAccessToken, getRefreshToken, setUserData };
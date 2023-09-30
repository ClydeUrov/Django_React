import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../helpers/axios';
import { useNavigate } from 'react-router-dom';

export const fetchRooms = createAsyncThunk('room/fetchRooms', async () => {
    const room = await axiosService.get(`/room/`);
    return room.data.results;
});

export const fetchRoomById = createAsyncThunk('room/fetchRoomById', async (roomId) => {
    const room = await axiosService.get(`/room/${roomId}`);
    return room.data;
});

export const addRoom = createAsyncThunk('room/addRoom', async (data) => {
    const room = await axiosService.post(`/room/`, data);
    useNavigate(`/room/${room.data.id}`)
    return room.data;
})

export const deleteRoomAsync = createAsyncThunk('room/deleteRoomAsync', async (roomId) => {
    console.log('delete')
    const room = await axiosService.delete(`/room/${roomId}`);
    return room.data;
})

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [],
        currentRoom: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
            })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.currentRoom = action.payload;
            })
            .addCase(addRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
            })
            .addCase(deleteRoomAsync.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter(room => room.id !== action.payload);
            })
    },
});

export default roomSlice.reducer;
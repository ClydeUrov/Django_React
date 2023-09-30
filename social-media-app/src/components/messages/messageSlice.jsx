import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosService from '../../helpers/axios';

export const fetchMessages = createAsyncThunk('room/fetchMessages', async (roomId) => {
    const messages = await axiosService.get(`/room/${roomId}/chat/`);
    return messages.data.results;
});

export const addMessage = createAsyncThunk('messages/addMessage', async ({ roomId, data }) => {
    const newMessage = await axiosService.post(`/room/${roomId}/chat/`, data);
    return newMessage.data;
});

export const deleteMessage = createAsyncThunk('room/deleteMessage', async (roomId, messageId) => {
    await axiosService.delete(`/room/${roomId}/chat/${messageId}`);
    return messageId;
});

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        currentMessage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = state.messages.filter(message => message.id !== action.payload);
            })
    },
});

export default messageSlice.reducer;
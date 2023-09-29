import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from './messageSlice';
import { format } from "timeago.js";
import { Image } from 'react-bootstrap';
import { getUser } from '../../hooks/user.actions';

const MessageList = ({ roomId }) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.message.messages);
    const user = getUser();

    useEffect(() => {
        if (roomId) {
            dispatch(fetchMessages(roomId));
        }
    }, [dispatch, roomId]);

    return (
        <div>
            <style>
                {`
                    .chat-card-start {
                        background-color: rgba(229, 198, 247, 0.6); 
                        width: 80%;
                        float: left;
                    }
                    .chat-card-end {
                        background-color: rgba(207, 247, 255, 0.6); 
                        width: 80%;
                        float: right;
                    }
                `}
            </style>
            {roomId === 'undefined' ? (
                <h5 style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '30px', color: '#062128' }}>
                    Choose a room, please
                </h5>
            ) : (
            <ul className="list-unstyled m-0">
                {messages.map((message) => (
                    <li 
                        key={message.id} 
                        className={`d-flex flex-column m-1 border border-2 rounded-5 border-secondary ${user.id === message.author.id ? "chat-card-end" : "chat-card-start"}`}
                    >
                        <div className="p-2 ms-2 d-flex align-items-center justify-content-between">
                            <div className="d-flex justify-content-center align-items-center">
                                <Image
                                    src={message.author.avatar}
                                    roundedCircle
                                    width={40}
                                    height={40}
                                    className="border border-primary border-2 me-2"
                                />
                                <p className="fs-6 m-0">{message.author.username}</p>
                            </div>
                            <p className="me-2 fs-6 fw-lighter m-0"><small>{format(message.created)}</small></p>
                        </div>
                        <p className="ms-4 p-1 fs-6 m-0">{message.text}</p>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default MessageList;
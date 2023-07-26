import React, { useState } from 'react';
import { getUser } from '../../hooks/user.actions';
import axiosService from '../../helpers/axios';
import { Button, Form } from "react-bootstrap";


function SendMessage(props) {
    const { roomId, refresh } = props;
    const [message, setMessage] = useState('');

    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            room: roomId,
            author: user.id,
            text: message
        }

        axiosService
            .post(`/room/${roomId}/chat/`, data)
            .then(() => {
                refresh();
                setMessage('');
            })
            .catch((e) => {
                console.log("Message not sent.")
            })
        }

    return (
        <>
            <Form onSubmit={handleSubmit} className='d-flex mx-4 my-4'>
                <Form.Control
                    className="me-3 rounded-pill border-primary text-primary"
                    type="text"
                    placeholder="Write a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="primary" type="submit" disabled={!message.trim()}>
                    Send
                </Button>
            </Form>
        </>
    )
}

export default SendMessage;
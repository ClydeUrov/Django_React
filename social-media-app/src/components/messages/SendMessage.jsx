import React, { useState } from 'react';
import { getUser } from '../../hooks/user.actions';
import { Button, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { addMessage } from './messageSlice';


function SendMessage(props) {
    const { roomId } = props;
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!message.trim()) {
            return; // Не отправляем пустое сообщение
        }
        
        const data = {
            room: roomId,
            author: user.id,
            text: message
        }

        dispatch(addMessage({ roomId, data }));
        setMessage('');
    };

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
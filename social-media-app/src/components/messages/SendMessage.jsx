import React, { useState } from 'react';
import { getUser } from '../../hooks/user.actions';
import axiosService from '../../helpers/axios';
import { Button, Form } from "react-bootstrap";


function SendMessage(props) {
    const { roomId, refresh } = props;
    const [message, setMessage] = useState('');
    // const [validated, setValidated] = useState(false);
    // const [form, setForm] = useState({})

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


    // const user = getUser();

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const createChatForm = event.currentTurget;

    //     if (createChatForm.checkValidity() === false) {
    //         event.stopPropagation()
    //     }
    //     setValidated(true);

    //     const data = {
    //         room: roomId,
    //         user: user.id,
    //         text: form.text
    //     }

    //     axiosService
    //         .get(`/room/${roomId}/chat/`, data)
    //         .then(() => {
    //             refresh();
    //             setForm({});
    //         })
    //         .catch((e) => {
    //             console.log("Message not sent.")
    //         })
    

    return (
        <>
            <Form onSubmit={handleSubmit} className='d-flex mx-4 my-2'>
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

{/* <Form.Group className="my-3 w-75">
                <Form.Control 
                    className="py-2 rounded-pill border-primary text-primary"
                    data-testid="show-modal-form"
                    type="text"
                    placeholder="Write a message"
                />
            </Form.Group>

            <Modal show={true}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Send Message</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form 
                        noValidate 
                        validated={validated} 
                        onSubmit={handleSubmit} 
                        data-testid="create-message-form"
                    >
                        <Form.Group className="">
                            <Form.Label htmlFor="title" className="mb-0 mt-0">Title: </Form.Label>
                            <Form.Control 
                                name="title"
                                data-testid="post-title-field"
                                label="Title"
                                placeholder="Enter your title"
                                value={form.title} 
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                as="textarea"
                                rows={1}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={!form.text} 
                        data-testid="create-post-submit"
                    >
                        Send
                    </Button>
                </Modal.Footer>
            </Modal> */}
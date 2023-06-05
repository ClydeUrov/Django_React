import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";


function CreatePost(props) {
    const { refresh } = props;
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});

    const { setToaster } = useContext(Context);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault(); // перезагружаем страницу
        const createPostForm = event.currentTarget;

        if (createPostForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            author: user.id,
            title: form.title,
            body: form.body,
            event_date: form.event_date,
            event_duration: form.event_duration,
            price: form.price,
            contacts: form.contacts,
            location: form.location
        }

        axiosService
            .post(`/post/`, data)
            .then(() => {
                handleClose();
                setToaster({
                    type: "success",
                    message: "Post created 🚀",
                    show: true,
                    title: "Post Success",
                });
                setForm({});
                refresh();
            })
            .catch(() => {
                setToaster({
                    title: "Post Error",
                    message: "An error occurred.",
                    type: "danger",
                    show: true,
                });
            });
    };

    return (
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control 
                    className="py-2 rounded-pill border-primary text-primary"
                    data-testid="show-modal-form"
                    text="text"
                    placeholder="Write a post"
                    onClick={handleShow}
                />
            </Form.Group>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form 
                        noValidate 
                        validated={validated} 
                        onSubmit={handleSubmit} 
                        data-testid="create-post-form"
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
                            <Form.Label htmlFor="body" className="mb-0 mt-2">Description: </Form.Label>
                            <Form.Control 
                                name="body"
                                data-testid="post-body-field"
                                placeholder="Enter your description"
                                value={form.body} 
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                as="textarea"
                                rows={3}
                            />
                            <Form.Label htmlFor="price" className="mb-0 mt-2">Price: </Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control 
                                    name="price"
                                    data-testid="post-price-field"
                                    placeholder="Enter your price"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    as="input"
                                    type="number"
                                    rows={2}
                                    step="0.01"
                                    min="0"
                                    max="1000000"
                                />
                                <span className="ms-2">$</span>
                            </div>
                            
                            <Form.Label htmlFor="event_date" className="mb-0 mt-2">Event Date:</Form.Label>
                            <Form.Control 
                                name="event_date"
                                data-testid="event-date-field"
                                type="datetime-local"
                                value={form.event_date}
                                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                            />
                        
                            <Form.Label htmlFor="event_duration" className="mb-0 mt-2">Duration:</Form.Label>
                            <Form.Control 
                                data-testid="event_duration"
                                name="event_duration"
                                type="text"
                                placeholder="_ days __:__:__"
                                value={form.event_duration}
                                onChange={(e) => setForm({ ...form, event_duration: e.target.value })}
                                
                            />
                            <Form.Label htmlFor="contacts" className="mb-0 mt-2">Contacts:</Form.Label>
                            <Form.Control 
                                data-testid="contacts"
                                name="contacts"
                                type="text"
                                placeholder="Enter your contacts"
                                value={form.contacts}
                                onChange={(e) => setForm({ ...form, contacts: e.target.value })}
                                
                            />

                            <Form.Label htmlFor="location" className="mb-0 mt-2">location:</Form.Label>
                            <Form.Control 
                                data-testid="location"
                                name="location"
                                type="text"
                                placeholder="Enter your location"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleSubmit} 
                        disabled={!form.body} 
                        data-testid="create-post-submit"
                    >
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default CreatePost;
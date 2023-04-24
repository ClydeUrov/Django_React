import React, { useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import Toaster from "../Toaster";

function UpdatePost(props) {
    const { post, refresh } = props;
    const [showToast, setShowToast] = useState(false);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        author: post.author.id,
        body: post.body,
    });
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = (event) => {
        event.preventDefault();
        const updatePostForm = event.currentTarget;
        
        if (updatePostForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            author: form.author,
            body: form.body,
        };

        console.log(data);
        console.log(post.author.id)

        axiosService
            .put(`/post/${post.id}/`, data)
            .then(() => {
                handleClose();
                setForm({});
                setShowToast(true);
                refresh();
            })
            .catch((error) => {console.log(error)});

    };

    return (
        <>
            <Dropdown.Item onClick={handleShow}>Modify</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                name="body" 
                                value={form.body} 
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate}>
                        Modify
                    </Button>
                </Modal.Footer>

            </Modal>
            <Toaster
                title="Success!"
                message="Post updated 🚀"
                type="success"
                showToast={showToast}
                onClick={() => setShowToast(false)}
            />
        </>
    );
}

export default UpdatePost;
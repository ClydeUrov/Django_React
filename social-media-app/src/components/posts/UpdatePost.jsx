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
        console.log(showToast);
        axiosService
            .put(`/post/${post.id}/`, data)
            .then(() => {
                handleClose();
                setShowToast(true);
                console.log(1, showToast);
                refresh();
                console.log(11, showToast);
                setShowToast(true);
                console.log(111, showToast);
            })
            .catch((error) => {console.log(error);
            });
        console.log("csdcs", showToast);
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
                onClose={() => setShowToast(false)}
            />
        </>
    );
}

export default UpdatePost;
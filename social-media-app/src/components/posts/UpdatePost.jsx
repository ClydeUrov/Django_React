import React, { useState, useContext } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";

function UpdatePost(props) {
    const { post, refresh } = props;
    // const [showToast, setShowToast] = useState(false);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        author: post.author.id,
        body: post.body,
    });
    const [validated, setValidated] = useState(false);
    const { setToaster } = useContext(Context);

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

        axiosService
            .put(`/post/${post.id}/`, data)
            .then(() => {
                handleClose();
                setToaster({
                    type: "success",
                    message: "Post updated 🚀",
                    show: true,
                    title: "Post Success",
                })
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
            <Dropdown.Item data-testid="show-modal-form" onClick={handleShow}>Modify</Dropdown.Item>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form noValidate validated={validated} onSubmit={handleUpdate} data-testid="update-post-form">
                        <Form.Group className="mb-3">
                            <Form.Control 
                                name="body"
                                data-testid="post-body-field"
                                value={form.body} 
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate} data-testid="update-post-submit">
                        Modify
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default UpdatePost;
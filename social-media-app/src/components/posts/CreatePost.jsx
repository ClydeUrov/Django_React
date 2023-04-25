import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import Toaster from "../Toaster";


function CreatePost(props) {
    const { refresh } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

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
            body: form.body
        }
        console.log(data)

        axiosService
            .post("/post/", data)
            .then(() => {
                handleClose();
                setToastMessage("Post created 🚀")
                setToastType("success");
                setForm({});
                console.log(4, showToast);
                setShowToast(true);
                console.log(44, showToast);
                refresh();
                console.log(444, showToast);
            })
            .catch((error) => {
                setToastMessage("An error occured 🧐")
                setToastType("danger");
            });
    };

    return (
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control 
                    className="py-2 rounded-pill border-primary text-primary"
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
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                    <Button variant="primary" onClick={handleSubmit} disabled={form.body === undefined}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toaster
                title="Post!"
                message={toastMessage}
                showToast={showToast}
                type={toastType}
                onClose={() => setShowToast(false)}
            />
        </>
    )
};

export default CreatePost;
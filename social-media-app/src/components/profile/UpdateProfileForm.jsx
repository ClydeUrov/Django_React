import React, { useState, useContext } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/user.actions";
import { Context } from "../Layout";

function UpdateProfileForm(props) {
    const { profile } = props;
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState(profile);
    const [error, setError] = useState(null);
    const userActions = useUserActions();
    const [avatar, setAvatar] = useState();

    const { setToaster } = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault(); // предотвращает поведение отправки формы по умолчанию, которое не обязательно перезагружает страницу
        const updateProfileForm = event.currentTarget;
        if (updateProfileForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const formData = new FormData();
        const data = {
            first_name: form.first_name,
            last_name: form.last_name,
            bio: form.bio,
        };
        
        if (avatar) {
            formData.append("avatar", avatar);
        };

        Object.keys(data).forEach((key) => {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        });

        userActions
            .edit(formData, profile.id)
            .then(() => {
                navigate(-1);
                setToaster({
                    type: "success",
                    message: "Profile updated 🚀",
                    show: true,
                    title: "Profile updated!",
                });
            })
            .catch((err) => {
                if (err.message) {
                    setError(err.request.response);
                }
        });
    };

    return (
        <Form 
            id="registration-form"
            className="border p-4 rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <Form.Group className="mb-3 d-flex flex-column">
                <Form.Label className="text-center">Avatar</Form.Label>
                <Image
                    src={form.avatar}
                    roundedCircle
                    width={120}
                    height={120}
                    className="me-2 border border-primary border-2 align-self-center"
                />
                <Form.Control 
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="w-50 align-self-center"
                    type="file"
                    size="sm"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    required
                    type="text"
                    placeholder="Enter first name"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    required
                    type="text"
                    placeholder="Enter last name"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    type="text"
                    placeholder="A simple bio ... (Optional)"
                    rows={3}
                />
            </Form.Group>

            <div className="text-content text-danger">
                {error && <p>{error}</p>}
            </div>
            <Button variant="primary" type="submit">
                Save changes
            </Button>
        </Form>
    );
}

export default UpdateProfileForm;
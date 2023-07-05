import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/user.actions";

function RegistrationForm() {
    // const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        bio: "",
    });
    const [error, setError] = useState(null);
    const userActions = useUserActions()

    const handleSubmit = (event) => {
        event.preventDefault(); // перезагружаем страницу
        const registrationForm = event.currentTarget;

        if (registrationForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
    
        const data = {
            username: form.username,
            password: form.password,
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            bio: form.bio,
        };

        userActions.register(data).catch((err) => {
            if (err.message) {
                const errorResponse = JSON.parse(err.request.response);
                let errorMessage = "";

                if (errorResponse.email) {
                    errorMessage += "Email: " + errorResponse.email + "\n";
                }
                if (errorResponse.username) {
                    errorMessage += "Username: " + errorResponse.username + "\n";
                }
                if (errorResponse.first_name) {
                    errorMessage += "First Name: " + errorResponse.first_name + "\n";
                }
                if (errorResponse.last_name) {
                    errorMessage += "Last Name: " + errorResponse.last_name + "\n";
                }
                if (errorResponse.password) {
                    errorMessage += "Password: " + errorResponse.password + "\n";
                }

                console.log(errorMessage)
                setError(errorMessage);
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
            data-testid="registration-form"
        >
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    value={form.first_name}
                    data-testid="first_name-field"
                    onChange={(e) => setForm({ ...form, first_name: e.target.value})}
                    required
                    type="text"
                    placeholder = "Enter first name"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    value={form.last_name} 
                    data-testid="last_name-field"
                    onChange={(e) => setForm({ ...form, last_name: e.target.value})}
                    required
                    type="text"
                    placeholder = "Enter last name"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    value={form.username}
                    data-testid="username-field"
                    onChange={(e) => setForm({ ...form, username: e.target.value})}
                    required
                    type="text"
                    placeholder = "Enter username"
                />
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    value={form.email}
                    data-testid="email-field"
                    onChange={(e) => setForm({ ...form, email: e.target.value})}
                    required
                    type="text"
                    placeholder = "Enter email address"
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={form.password}
                    data-testid="password-field"
                    minLength="8"
                    onChange={(e) => setForm({ ...form, password: e.target.value})}
                    required
                    type="password"
                    placeholder = "Enter password"
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    value={form.bio}
                    data-testid="bio-field"
                    onChange={(e) => setForm({ ...form, bio: e.target.value})}
                    as="textarea"
                    rows={3}
                    placeholder = "A simple bio ... (Optional)"
                />
            </Form.Group>

            <div className="text-content text-danger" style={{ whiteSpace: 'pre-line' }}>
                {error && <pre>{error}</pre>}
            </div>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default RegistrationForm;


import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions";

function LoginForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const userActions = useUserActions();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if (loginForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            email: form.email,
            password: form.password,
        };

        userActions.login(data).catch((err) => {
            if (err.message) {
                const errorResponse = JSON.parse(err.request.response);
                setError(errorResponse.detail);
            }
        });

    };

    return (
        <Form 
            id="login-form"
            className="border p-4 rounded"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="login-form"
        >
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

            <div className="text-content text-danger">
                {error && <p>{error}</p>}
            </div>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    );
}

export default LoginForm;

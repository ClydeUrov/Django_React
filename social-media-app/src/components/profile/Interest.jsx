import React, { useState } from 'react';
import axiosService from '../../helpers/axios';
import { Form, Button} from "react-bootstrap";


function Interest(props) {
    const { allInterests, user_id } = props;
    const [interests, setInterests] = useState(allInterests.map((interest) => interest.name) || []);
    const [newInterest, setNewInterest] = useState("");

    const handleInterest = (action, body) => {
        axiosService
            .patch(`/user/${user_id}/${action}/`, body)
            .then(() => {
                if (action === "add_interest") {
                    setInterests([...interests, body.interest_name]);
                    setNewInterest("");
                } else if (action === "remove_interest") {
                    const removeInterests = interests.filter(interest => interest !== body.interest_name);
                    setInterests(removeInterests);
                }
            })
            .catch((err) => console.error(err));
    }

    return (
        <Form.Group className="mb-3">
                <Form.Label>Your interests</Form.Label>
                <div className="d-flex flex-wrap align-items-center font-size-3">
                    {interests.map((interest, index) => (
                        <span key={index} className="badge bg-primary me-2 fs-6">
                            {interest}
                            <span
                                className="ms-1 cursor-pointer"
                                onClick={() => handleInterest("remove_interest", {interest_name: interest})}
                                style={{ cursor: 'pointer' }}
                            >
                                &times;
                            </span>
                        </span>
                    ))}
                </div>
                <div className="d-flex align-items-center mt-2">
                    <Form.Control
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        type="text"
                        placeholder="Enter your interest"
                    />
                    <Button
                        variant="primary"
                        className="ms-2"
                        onClick={() => handleInterest("add_interest", {interest_name: newInterest})}
                        style={{ minWidth: '130px' }}
                    >
                        Add Interest
                    </Button>
                </div>
            </Form.Group>
    );
}

export default Interest;
import React, { useState, useEffect } from 'react';
import axiosService from '../../helpers/axios';


function Interest(props) {
    const { userId, refresh, interests } = props;
    const [validated, setValidated] = useState(false);
    const [pTag, setPTag] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const createInterestForm = event.currentTarget;

        if (createInterestForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            name: pTag,
            author: userId
        }

        axiosService
            .post(`/user/${userId}/interest/`, data)
            .then(() => {
                setPTag('');
                refresh();
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const handleDelete = (interestId) => {
        console.log("interestId", interestId)
        axiosService
            .delete(`/user/${userId}/interest/${interestId}/`)
            .then(() => {
                interests.results.splice(interestId, 1);
                refresh();
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        refresh();
    }, [interests, refresh]);

    return (
        <div validated={validated.toString()}>
            {interests.results.map((int) => (
                <div className="d-flex" key={int.id}>
                    <p>{int.name}</p>
                    <button className="fs-6 fw-lighter ms-2 border border-primary border-2 rounded-pill" style={{height: "28px"}}
                    onClick={() => handleDelete(int.id)}>Del</button>
                </div>
            ))}
    
            <form onSubmit={handleSubmit}>
                <input type="text" value={pTag} onChange={(event) => setPTag(event.target.value)}/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Interest;
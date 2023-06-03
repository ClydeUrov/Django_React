import React, { useEffect, useState } from 'react';
import axiosService from '../../helpers/axios';


function Interest(props) {
    const { userId } = props;
    const [interests, setInterests] = useState([]);
    const [newInterest, setNewInterest] = useState('');
    
    const handleChange = (event) => {
        setNewInterest(event.target.value);
    };

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await axiosService.get(`/user/${userId}/interest/`);
                const fetchedInterests = response.data.results;
                
                setInterests(fetchedInterests);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchInterests();
    }, [userId]);

    const addInterest = async (event) => {
        event.preventDefault();
        const data = {
            name: newInterest,
            author: userId
        }
        console.log(data)
        try {
            const response = await axiosService.post(`/user/${userId}/interest/`, data);
            setInterests([...interests, response.data]);
            setNewInterest('');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteInterest = async (interestId) => {
        try {
            await axiosService.delete(`/user/${userId}/interest/${interestId}/`);
            setInterests(interests.filter((interest) => interest.id !== interestId ));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* Render the list of interests */}
            {interests.map((interest) => (
            <div key={interest.id}>
                <p>{interest.name}</p>
                <button onClick={() => deleteInterest(interest.id)}>Delete</button>
            </div>
            ))}

            {/* Form for adding new interests */}
            <form onSubmit={addInterest}>
                <input type="text" value={newInterest} onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Interest;
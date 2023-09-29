import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from './roomSlice';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoomList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    return (
        <div>
            <ul className="list-unstyled m-0">
                {rooms.map((room) => (
                    <Link to={`/room/${room.id}/`}>
                        <li key={room.id} className='border m-3'>
                            <Image
                                src={room.creator.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="m-2 border border-primary border-2"
                            />---  
                            <Image
                                src={room.invited.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="m-2 border border-primary border-2"
                            />
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, deleteRoomAsync } from './roomSlice';
import { Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MoreToggleIcon from "../MoreToggleIcon";

const RoomList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.rooms);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const handleDelete = (roomId) => {
        dispatch(deleteRoomAsync(roomId))
    }

    return (
        <div>
            <div className="d-flex flex-column list-unstyled m-0">
                {rooms.map((room) => (
                    <Link to={`/room/${room.id}/`} key={room.id} className='d-flex align-items-center border m-1 w-auto text-decoration-none'>
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
                        <Dropdown className='fs-2'>
                            <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDelete(room.id)} className="link-danger">
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
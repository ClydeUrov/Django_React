import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, deleteRoomAsync } from './roomSlice';
import { Dropdown, Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import MoreToggleIcon from "../MoreToggleIcon";

const RoomList = () => {
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.rooms);
    const { roomId } = useParams();

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    const handleDelete = async (roomId) => {
        await dispatch(deleteRoomAsync(roomId));
        dispatch(fetchRooms());
    }

    return (
        <div className="d-flex flex-column list-unstyled m-0">
            <style>
                {`
                    .active-room {
                        background-color: rgba(229, 198, 247, 0.6);
                        margin: 3px 5px;
                        border: 2px solid rgba(0, 0, 255, 0.5);

                    }
                    .inactive-room {
                        background-color: rgba(207, 247, 255, 0.6);
                        margin: 3px 15px;
                    }
                    .drop-a a {
                        display: flex;
                        align-items: center;
                    }
                    .drop-a {
                        background-color: rgba(0, 0, 0, 0.1);
                        border-left: 2px solid rgba(0, 0, 0, 0.3);
                        border-radius: 10px;
                        padding: 10px 0;
                        margin: 3px;
                    }
                `}
            </style>
            {rooms.map((room) => (
                <div
                    key={room.id}
                    className={`d-flex align-items-center w-auto text-decoration-none rounded-2 ${
                        room.id === roomId ? 'active-room' : 'inactive-room'
                    }`}
                >
                    <Link to={`/room/${room.id}/`} className='d-flex align-items-center w-100'>
                        <Image
                            src={room.creator.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="m-2 border border-primary border-2"
                        />
                        <div className='col item-decoration-none font-weight-bold'>
                            {room.creator.username}<br/>{room.invited.username}
                        </div>
                        <Image
                            src={room.invited.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="m-2 border border-primary border-2"
                        />
                    </Link>
                    <Dropdown className='fs-2 drop-a'>
                        <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDelete(room.id)} >
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ))}
        </div>
    );
};

export default RoomList;
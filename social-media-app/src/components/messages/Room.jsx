import React, { useContext, useState } from 'react';
import axiosService from '../../helpers/axios';
import { Context } from "../Layout";
import { Image, Card } from "react-bootstrap";
import { CloseCircleOutlined } from '@ant-design/icons';

function Room(props) {
    const { room, refresh, currentRoom } = props;
    const { setToaster } = useContext(Context);
    const [show, setShow] = useState(false);
    console.log(room.id, currentRoom)
    const isSelected = room.id === currentRoom;
    
    const handleDelete = () => {
        axiosService
            .delete(`/room/${room.id}/`)
            .then(() => {
                setToaster({
                    title: "Dialog deleted",
                    message: "Dialog deleted 🚀",
                    type: "warning",
                    show: true,
                });
                refresh();
            })
            .catch((e) => {
                setToaster({
                    title: "Room Error",
                    message: "An error occurred.",
                    type: "danger",
                    show: true,
                });
            });
    };

    return (
        <>  
            <style>
            {`
                .room-item {
                    width: 85%;
                    margin: 0 auto; /* Для размещения по центру */
                }
                .selected {
                    width: 95%;
                    background-color: rgba(229, 198, 247, 0.6);
                }
                .icon-wrapper {
                    display: flex;
                    font-size: 24px;
                    transition: all 0.3s;
                    align-items: center;
                }

                .icon-wrapper:hover {
                    font-size: 32px;
                    color: red;
                }
            `}
            </style>
            {room.invited.map((user) => (
            <Card 
                className={`rounded-3 my-2 w-80 ${isSelected ? 'selected' : 'room-item'}`} 
                data-testid="card-test"
                key={user.id}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <Card.Body className="d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-row">
                        <Image
                            src={user.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-2 border border-primary border-2"
                        />
                        <Card.Text className="fw-bold fs-4">{user.username}</Card.Text>
                    </div>
                    {show && (
                        <div className="icon-wrapper" onClick={handleDelete}>
                            <CloseCircleOutlined />
                        </div>
                    )}
                </Card.Body>
            </Card>
            ))}
        </>
    )
}

export default Room;
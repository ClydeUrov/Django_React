import React, { useContext } from 'react';
import { format } from "timeago.js";
import { getUser } from '../../hooks/user.actions';
import axiosService from '../../helpers/axios';
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";
import { Image, Card, Dropdown } from "react-bootstrap";

function Room(props) {
    const { room, refresh } = props;
    const { setToaster } = useContext(Context);

    const user = getUser();
    
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
            .catch(() => {
                setToaster({
                    title: "Post Error",
                    message: "An error occurred.",
                    type: "danger",
                    show: true,
                });
            });
    };

    return (
        <>
            <Card className="rounded-3 my-2" data-testid="post-test">
                <Card.Body>
                    <Card.Title className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row">
                            <Image
                                src={user.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="me-2 border border-primary border-2"
                            />
                            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                                <p className="fs-6 fw-lighter">
                                    <small>{format(room.date)}</small>
                                </p>
                            </div>
                        </div>
                    </Card.Title>
                    <Card.Text className="fw-bold fs-4">{room.creator.username}</Card.Text>
                    <Card.Text className="fw-bold fs-4">{room.invited.username}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Room;
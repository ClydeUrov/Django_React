import React from "react";
import { Card, Button, Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser, useUserActions } from "../../hooks/user.actions";
import { MessageOutlined } from "@ant-design/icons";
// mdb-react-ui-kit react-icons/fa

function ProfileCard(props) {
    const myId = getUser().id;
    const navigate = useNavigate();

    const { user } = props;

    const handleNavigateToProfile = () => {
        navigate(`/profile/${user.id}/`)
    };

    const userActions = useUserActions();

    const checkRoomExistence = () => {
        userActions
            .getRooms()
            .then((rooms) => {
                const existingRoom = rooms.find(
                    (room) => room.creator.id === myId && room.invited[0].id === user.id
                );
        
                if (existingRoom) {
                // Если комната существует, перенаправляем на существующую комнату
                    navigate(`/room/${existingRoom.id}`);
                } else {
                // Если комната не существует, создаем новую комнату
                    handleSubmit();
                }
            })
            .catch((error) => {
                console.error('Error checking room existence:', error);
            });
    };
    
    const handleSubmit = () => {
        const data = {
            creator: myId,
            invited: [user.id],
        };

        userActions.createRoom(data).catch((err) => {
            if (err.message) {
                const errorResponse = JSON.parse(err.request.response);
                console.log(errorResponse.detail);
            }
        });
    }

    return (
        <Card className="border-bottom border-0">
            <div className="d-flex">
                <Image
                    src={user.avatar}
                    roundedCircle
                    style={{ minWidth: 50, maxHeight: 50,}}
                    className="my-3 border border-primary border-2"
                />
                <Card.Body>
                    <Card.Title className="fs-6">{user.username}</Card.Title>
                    <div className="d-flex align-items-center">
                        <Button variant="primary" onClick={handleNavigateToProfile}>See Profile</Button>
                        <Button
                            variant="link"
                            onClick={checkRoomExistence} // Handle form submission
                            className="d-flex fs-3"
                        >
                            <MessageOutlined />
                        </Button>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
}

export default ProfileCard;
import React from "react";
import { Card, Button, Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/user.actions";
import { MessageOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addRoom } from "../messages/roomSlice";
import axiosService from "../../helpers/axios";
// mdb-react-ui-kit react-icons/fa

function ProfileCard(props) {
    const dispatch = useDispatch();
    const myId = getUser().id;
    const navigate = useNavigate();

    const { user } = props;

    const handleNavigateToProfile = () => {
        navigate(`/profile/${user.id}/`)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axiosService.get(`/room/?creator=${myId}&invited=${user.id}`);
    
        if (Object.keys(response.data).length === 0) {
            const resultAction = await dispatch(addRoom({ creator: myId, invited: user.id }))
            navigate(`/room/${resultAction.payload.id}`)
        } else {
            navigate(`/room/${response.data.id}`);
        }
    };

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
                            onClick={handleSubmit} // Handle form submission
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
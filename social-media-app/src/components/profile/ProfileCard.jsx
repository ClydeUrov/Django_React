import React from "react";
import { Card, Button, Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function ProfileCard(props) {
    const navigate = useNavigate();
    const { user } = props;

    const handleNavigateToProfile = () => {
        navigate(`/profile/${user.id}/`)
    };

    return (
        <Card className="border-0 p-2">
            <div className="d-flex">
                <Image
                    src={user.avatar}
                    roundedCircle
                    width={48}
                    height={48}
                    className="my-3 border border-primary border-2"
                />
                <Card.Body>
                    <Card.Title className="fs-6">{user.username}</Card.Title>
                    <div className="d-flex align-items-center">
                        <Button variant="primary" onClick={handleNavigateToProfile}>See Profile</Button>
                        <a href={`/message/${user.id}/`} className="ms-3 fs-3">
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </a>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
}

export default ProfileCard;
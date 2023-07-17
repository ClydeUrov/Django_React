import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Interest from "./Interest";

function ProfileDetails(props) {
    const { user, interests, refresh } = props;
    const navigate = useNavigate();

    if (!user || !interests) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="d-flex flex-row border-bottom border-secondary p-4">
                <Image
                    src={user.avatar}
                    roundedCircle
                    width={120}
                    height={120}
                    className="me-5 border border-primary border-2"
                />
                <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                    <p className="fs-4 m-0">{user.username}</p>
                    <p className="fs-4 m-0">{user.first_name} {user.last_name}</p>
                    <p className="fs-5">{user.bio ? user.bio : "(No bio.)"}</p>
                    <p className="fs-6"><small>{user.posts_count} posts</small></p>
                    <Button
                        variant="primary"
                        size="sm"
                        className="w-150"
                        onClick={() => navigate(`/profile/${user.id}/edit/`)}
                    >
                        Edit
                    </Button>
                </div>
                <div className="d-flex flex-column justify-content-right align-self-right mt-2 ms-auto">
                    <p className="fs-4">Interests: </p>
                    <Interest userId={user.id} interests={interests} refresh={refresh}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;
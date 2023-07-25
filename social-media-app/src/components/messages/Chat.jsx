import React from "react";
import axiosService from "../../helpers/axios";
import { format } from "timeago.js";
import { Image, Card } from "react-bootstrap";


function Chat(props) {
    const { roomId, chat, refresh } = props;

    const handleDelete = () => {
        axiosService
            .delete(`/room/${roomId}/chat/${chat.id}/`)
            .then(() => {
                console.log("Message deleted")
                refresh();
            })
            .catch((e) => {
                console.log(e)
            });
    };

    return (
        <Card className="rounded-3 my-2 mx-auto" data-testid="comment-test" 
            style={{ backgroundColor: 'rgba(70, 90, 200, 0.2)', width: '94%' }}>
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <Image
                            src={chat.author.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-2 border border-primary border-2"
                        />
                        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                            <p className="fs-6 m-0">{chat.author.username}</p>
                            <p className="fs-6 fw-lighter m-0"><small>{format(chat.created)}</small></p>
                        </div>
                    </div>
                    
                </Card.Title>
                <Card.Text>{chat.text}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Chat;
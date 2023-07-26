import React, {useState} from "react";
import axiosService from "../../helpers/axios";
import { format } from "timeago.js";
import { Image, Card } from "react-bootstrap";
import { CloseCircleOutlined } from '@ant-design/icons';
import { getUser } from "../../hooks/user.actions";

function Chat(props) {
    const { roomId, chat, refresh } = props;
    const [show, setShow] = useState(false);

    const user = getUser();
    const isUserAuthor = user.id === chat.author.id;

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
        <>
            <style>
                {`
                    .chat-card-start {
                        background-color: rgba(229, 198, 247, 0.6); 
                        width: 80%;
                        float: left;
                    }
                    .chat-card-end {
                        background-color: rgba(207, 247, 255, 0.6); 
                        width: 80%;
                        float: right;
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
            <Card
                className={`rounded-3 my-2 mx-4 ${isUserAuthor ? "chat-card-end" : "chat-card-start"}`}
                data-testid="card-test" 
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
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
                        {show && (
                            <Card.Text className="icon-wrapper" onClick={handleDelete}>
                                <CloseCircleOutlined />
                            </Card.Text>
                        )}
                    </Card.Title>
                    <Card.Text>{chat.text}</Card.Text>
                    
                </Card.Body>
            </Card>
        </>
    )
}

export default Chat;
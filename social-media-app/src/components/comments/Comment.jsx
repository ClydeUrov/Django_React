import React, { useContext } from "react";
import { format } from "timeago.js";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";
import UpdateComment from "./UpdateComment";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";

function Comment(props) {
    const { postId, comment, refresh } = props;
    const { setToaster } = useContext(Context);

    const user = getUser();

    const handleLike = (action) => {
        axiosService
            .post(`/post/${postId}/comment/${comment.id}/${action}/`)
            .then(() => {
                refresh();
            })
            .catch((err) => console.error(err));
    }

    const handleDelete = () => {
        axiosService
            .delete(`/post/${postId}/comment/${comment.id}/`)
            .then(() => {
                setToaster({
                    title: "Comment Deleted",
                    message: "Comment deleted 🚀",
                    type: "danger",
                    show: true,
                });
                refresh();
            })
            .catch(() => {
                setToaster({
                    title: "Comment Error",
                    message: "An error occurred.",
                    type: "warning",
                    show: true,
                });
            });
    };


    return (
        <Card className="rounded-3 my-2 mx-auto" data-testid="comment-test" 
            style={{ backgroundColor: 'rgba(70, 90, 200, 0.2)', width: '94%' }}>
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <Image
                            src={comment.author.avatar}
                            roundedCircle
                            width={48}
                            height={48}
                            className="me-2 border border-primary border-2"
                        />
                        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                            <p className="fs-6 m-0">{comment.author.name}</p>
                            <p className="fs-6 fw-lighter"><small>{format(comment.created)}</small></p>
                        </div>
                    </div>
                    {user.name === comment.author.name && (
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <UpdateComment comment={comment} refresh={refresh} postId={postId} />
                                    <Dropdown.Item onClick={handleDelete} className="text-danger">Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    )}
                </Card.Title>
                <Card.Text>{comment.body}</Card.Text>
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <LikeFilled style={{
                            color: "#fff",
                            backgroundColor: "#0D6EFD",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "75%",
                            padding: "2px",
                            margin: "3px",
                        }} />
                        <p className="ms-1 fs-6">
                            <small>{comment.likes_count} like</small>
                        </p>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer className="custom-footer justify-content-between border-0" style={{ backgroundColor: 'transparent' }}>
                <div className="d-flex flex-row">
                    <LikeOutlined 
                        style={{
                            width: "24px",
                            height: "24px",
                            padding: "2px",
                            fontSize: "20px",
                            color: comment.liked ? "#0D6EFD" : "#444444",
                        }}
                        onClick={() => {
                            if (comment.liked) {
                                handleLike("remove_like");
                            } else {
                                handleLike("like");
                            }
                        }}
                    />
                    <p className="ms-1">
                        <small>Like</small>
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );

}

export default Comment;
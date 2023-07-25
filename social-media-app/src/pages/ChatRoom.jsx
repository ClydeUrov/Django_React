import React from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { fetcher } from '../helpers/axios';
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Room from '../components/messages/Room'
import SendMessage from '../components/messages/SendMessage'
import Chat from '../components/messages/Chat'

function ChatRoom() {
    const { roomId } = useParams();

    const rooms = useSWR(`/room/`, fetcher);
    const chats = useSWR(roomId ? `/room/${roomId}/chat/` : null, fetcher);

    if (!roomId) {
        return <div>Choose a room, please</div>;
    }

    return (
        <Layout>
            <style>
            {`
                .rooms-overflow {
                    overflow: hidden;
                    max-height: 450px;
                }

                .rooms-overflow:hover {
                    overflow: auto;
                    transition: 0.5s;
                }
            `}
            </style>
            <h1>Chat Room</h1>
            <Row className="justify-content-center">
                <Col sm={3} className='me-3'>
                    <h2>Room Details</h2>
                    <div className="rooms-overflow">
                        {rooms.data && rooms.data.results.map((room, index) => (
                            <Link to={`/room/${room.id}/`} key={room.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Room room={room} refresh={rooms.mutate} />
                            </Link>
                        ))}
                    </div>
                </Col>
                <Col sm={7}  className="">
                    <h2>Chat Messages</h2>
                    <div className="overflow-auto border bg-white rounded-3 py-4" style={{maxHeight: '450px', minHeight: '200px'}}>
                        {chats.data && chats.data.results.map((chat, index) => (
                            <div key={index}>
                                <Chat roomId={roomId} chat={chat} refresh={chat.mutate} />
                            </div>
                        ))}
                    </div>
                    <SendMessage roomId={roomId} refresh={chats.mutate} />
                </Col>
            </Row>
        </Layout>
    )
}

export default ChatRoom;
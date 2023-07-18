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
            <h1>Chat Room</h1>
            <Row className="justify-content-center">
                <Col sm={3} className='me-3'>
                    <h2>Room Details</h2>
                    {rooms.data && rooms.data.results.map((room, index) => (
                        <Link to={`/room/${room.id}/`} key={room.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Room room={room} refresh={room.mutate} />
                        </Link>
                    ))}
                </Col>
                <Col sm={7}  className="border bg-white rounded-3 py-4 my-4 h-50">
                    <h2>Chat Messages</h2>
                    {chats.data && chats.data.results.map((chat, index) => (
                        <div>
                            <Chat key={index} roomId={roomId} chat={chat} refresh={chat.mutate} />
                        </div>
                    
                    ))}
                    <SendMessage roomId={roomId} refresh={chats.mutate} />
                </Col>
            </Row>
        </Layout>
    )
}

export default ChatRoom;
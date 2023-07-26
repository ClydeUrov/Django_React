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
    const chats = useSWR(`/room/${roomId}/chat/`, fetcher);

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
                ::-webkit-scrollbar {
                    width: 10px;
                }
                ::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 5px grey;
                    border-radius: 10px;
                    transition: 0.5s;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgb(37, 152, 230);
                    border-radius: 10px;
                    transition: 0.5s;
                }
            `}
            </style>
            
            <Row className="justify-content-center">
                <Col sm={3} className=''>
                    <h2>Rooms</h2>
                    <div className="rooms-overflow justify-content-center">
                        {rooms.data && rooms.data.results.map((room) => (
                            <Link to={`/room/${room.id}/`} key={room.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Room room={room} refresh={rooms.mutate} currentRoom={roomId} />
                            </Link>
                        ))}
                    </div>
                </Col>
                <Col sm={7}  className="">
                    <h2>Messages</h2>
                    <div className="border bg-white rounded-3 pt-4" >
                        <div className="overflow-auto" style={{maxHeight: '450px'}}>
                            {chats.data && chats.data.results.map((chat, index) => (
                                <div key={index}>
                                    <Chat roomId={roomId} chat={chat} refresh={chats.mutate} />
                                </div>
                            ))}
                        </div>
                        <SendMessage roomId={roomId} refresh={chats.mutate} />
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default ChatRoom;
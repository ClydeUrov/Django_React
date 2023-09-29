import React from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { fetcher } from '../helpers/axios';
import { Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import RoomList from '../components/messages/Room1';
import MessageList from '../components/messages/Message';
import SendMessage from '../components/messages/SendMessage';

function Messenger() {
    const { roomId } = useParams();

    return (
        <Layout hasNavigationBack>
            <Row className="justify-content-between">
                <Col sm={4} className='d-flex flex-column' style={{ maxHeight: '650px' }}>
                    <h1>Room List</h1>
                    <div className='border border-2 rounded-2 border-dark bg-light overflow-auto'>
                        <RoomList />
                    </div>
                </Col>
                <Col sm={8} className='d-flex flex-column' style={{ maxHeight: '650px' }}>
                    <h1>Message List</h1>
                    <div className='border border-2 rounded-2 border-dark bg-light overflow-auto'>
                        <MessageList roomId={roomId}/>
                        
                    </div>
                    <SendMessage roomId={roomId}/>
                </Col>
            </Row>
        </Layout>
    )
}

export default Messenger;
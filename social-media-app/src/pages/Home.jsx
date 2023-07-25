import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Image } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import ProfileCard from "../components/profile/ProfileCard";


function Home() {
    const posts = useSWR("/post/", fetcher, {refreshInterval: 20000,});

    const profiles = useSWR("/user/?limit=6", fetcher);

    const user = getUser();

    const filteredProfiles = profiles.data ? profiles.data.results.filter(profile => profile.id !== user.id) : [];

    if (!user) {
        return <div>Loading!</div>;
    }

    return(
        <Layout>
            <Row className="justify-content-evenly">
                <Col sm={7}>
                    <Row className="border-rounded align-items-center">
                        <Col className="flex-shrink-1">
                            <Image
                                src={user.avatar}
                                roundedCircle
                                width={52}
                                height={52}
                                className="my-2"
                            />
                        </Col>
                        <Col sm={10} className="flex-grow-1">
                            <CreatePost refresh={posts.mutate} />
                        </Col>
                    </Row>
                    <Row>
                        {posts.data?.results.map((post, index) => (
                            <Post key={index} post={post} refresh={posts.mutate}/>
                        ))}
                    </Row>
                </Col>
                <Col sm={3}  className="border bg-white rounded-3 py-4 my-2 h-50">
                    <h4 className="font-weight-bold text-center">Suggested people</h4>
                    <div className="d-flex flex-column">
                        {filteredProfiles.map((profile, index) => (
                            <ProfileCard key={index} user={profile} />
                        ))}
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default Home;

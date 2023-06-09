import React from "react";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { getUser, useUserActions } from "../hooks/user.actions";
import { Link } from "react-router-dom";

function Navigationbar() {
    const user = getUser();
    const userActions = useUserActions();
    // const setToaster = useContext(Context);

    // const handleLogout = () => {
    //     userActions.logout().catch((e) =>
    //         setToaster({
    //             type: "danger",
    //             message: "Logout failed",
    //             show: true,
    //             title: e.data?.detail | "An error occured.",
    //         })
    //     );
    // };

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home">
                    Postagram
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title={
                            <Image src={user.avatar} roundedCircle width={36} height={36} />
                        }>
                            <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={userActions.logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;
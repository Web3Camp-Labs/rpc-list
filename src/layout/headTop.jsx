import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Logo from "../images/web3camp.png";

export default function HeaderTop() {
    return <div className="header">
        <Container>
            <Row>
                <Col className="headerTxt" md={12}>
                    <a href="https://web3camp.us" target="_blank" rel="noreferrer">
                        <img src={Logo} alt=""/>
                    </a>
                </Col>
            </Row>
        </Container>
    </div>
}

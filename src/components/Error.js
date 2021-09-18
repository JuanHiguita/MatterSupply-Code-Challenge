import React, { Fragment } from 'react';
import {Container, Image} from "react-bootstrap";
import error404 from "../images/error404.png";
import "./styles/Error.css"

function Error(){
    return(
        <Fragment>
            <Container fluid="sm" className="errorContainer">
                <Image src={error404} className="errorImage" fluid/>
                <p className="errorMessage">Sorry, right now we can't find any gist 😔</p>
            </Container>
        </Fragment>
    )
}

export default Error;
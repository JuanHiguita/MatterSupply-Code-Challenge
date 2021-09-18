import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {HiOutlinePencilAlt} from "react-icons/hi";
import CreateGistForm from "./CreateGistForm";
import "./styles/CreateGist.css";

function CreateGist(props){
    const {userToken} = props;
    const [modalShow, setModalShow] = React.useState(false);
        
    return(
        <>  
            {/*controller to display the modal with the form for creating a new gist*/}
            <Button className="displayCreateGistForm" variant="dark" onClick={() => setModalShow(true)}>
                <HiOutlinePencilAlt/>
            </Button>

            <CreateGistForm
            show={modalShow}
            userToken={userToken}
            onHide={() => setModalShow(false)}/>
        </>
    );
    
}

export default CreateGist;

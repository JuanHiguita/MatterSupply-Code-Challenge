import React, {Component} from "react";
import {Button} from "react-bootstrap";
import  {MdModeEdit} from "react-icons/md";
import UpdateGistForm from "./UpdateGistForm";
import "./styles/UpdateGist.css";

function UpdateGist(props){
    const {userToken,gist} = props;
    const [modalShow, setModalShow] = React.useState(false);
        
    return(
        <>
            {/*controller to display the modal with the form for update a gist*/}
            <Button className="displayUpdateGistForm" onClick={() => setModalShow(true)}>
                <MdModeEdit/> Edit Gist
            </Button>

            <UpdateGistForm
            show={modalShow}
            userToken={userToken}
            gist={gist}
            id={gist.id}
            onHide={() => setModalShow(false)}/>
        </>
    );
    
}

export default UpdateGist;

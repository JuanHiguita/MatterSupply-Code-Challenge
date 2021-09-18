import React, {Component} from "react";
import {Modal, Button, Form, Col, Row} from "react-bootstrap";
import "./styles/CreateGistForm.css";

class CreateGistForm extends Component {

    //request to post a new gist *Important* send the token of the logged user in the headers
    postGist = (token,filename,description,content) => {
        let url = 'https://api.github.com/gists';
        let post = {
            description: `${description}`,
            files:{
                [`${filename}.md`]:{
                    content:`${content}`
                }
            },
            public: true,
        }
        post = JSON.stringify(post);
        let req = () => {
        fetch(url,{
            method: 'POST',
            body: post,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                Authorization: `token ${token}`
            }
        })
        .then(response => response.json())}
        alert('You have posted a new gist')
        req()
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onHide();
        this.postGist(this.props.userToken, this.refs.filename.value, this.refs.description.value, this.refs.content.value)
    }


    render(){
        let {...props} = this.props;
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modalGistForm"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="formTitle" id="contained-modal-title-vcenter">
                Create New Gist
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e=>this.handleSubmit(e)}>
                    <Row>
                        <Col md className="mb-3">
                            <Form.Group>
                                <Form.Control  type="text" ref="description" placeholder="Gist description"/>
                            </Form.Group>
                        </Col>
                        <Col md className="mb-3">
                            <Form.Group>
                                <Form.Control  type="text" ref="filename" placeholder="Filename"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Control type="text"  as="textarea" rows={5} ref="content" placeholder="Content"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="createGistButton" variant="dark" onClick={e=>this.handleSubmit(e)}>Post</Button>
            </Modal.Footer>
          </Modal>
        );
    }
  }

  export default CreateGistForm;
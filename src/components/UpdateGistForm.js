import React, {Component} from "react";
import {Modal, Button, Form, Col, Row} from "react-bootstrap";
import "./styles/CreateGistForm.css";

class UpdateGistForm extends Component {
    
    state = {
        gist: null,
        content: "",
        language: "",
        filename: "",
        description: ""
    }
    //with getGist we get all the data related to a single gist
    getGist = (id) => {
        fetch(`https://api.github.com/gists/${id}`)
        .then(response => response.json())
        .then(response => this.setState({gist: response, description: response.description}, ()=>this.getContent()))
        .catch((error)=>console.log(error));
    }
    //getContent we get the content of the gist we are looking in the function getGist
    getContent = () => {
        let gist = Object.values(this.state.gist.files)[0].raw_url;
        let gistLanguage = Object.values(this.state.gist.files)[0].language;
        let gistFilename = Object.values(this.state.gist.files)[0].filename;
        this.setState({language: gistLanguage, filename: gistFilename})
        fetch(gist)
        .then(response => response.text())
        .then(text => this.setState({content: text}));
    }

    //with editGist we make the request to the API to update the selected gist with the new data 
    //*Important* pass the token of the user that is logged in the headers
    editGist = (token, gistId,filename,description,content) => {
        let url = `https://api.github.com/gists/${gistId}`;
        let post = {
            description: `${description}`,
            files:{
                [`${filename}`]:{
                    content:`${content}`
                }
            },
            public: true,
        }
        post = JSON.stringify(post);
        let req = () => {
        fetch(url,{
            method: 'PATCH',
            body: post,
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                Authorization: `token ${token}`
            }
        })
        .then(response => response.json())}
        alert('You have updated your gist')
        req()
    }
    //we control when the form is submitted and call the function to make the request with the new data to the API.
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onHide();
        this.editGist(this.props.userToken, this.state.gist.id, this.refs.filename.value, this.refs.description.value, this.refs.content.value)
    }
    //we register the changes in the form inputs and save them in the current state of the component
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    //when the component is loaded we get the data from the gist
    componentDidMount(){
        this.getGist(this.props.id)
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
                Update Gist
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e=>this.handleSubmit(e)}>
                    <Row>
                        <Col md className="mb-3">
                            <Form.Group>
                                <Form.Control  type="text" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} ref="description" placeholder="Gist description"/>
                            </Form.Group>
                        </Col>
                        <Col md className="mb-3">
                            <Form.Group>
                                <Form.Control  type="text" value={this.state.filename} ref="filename" placeholder="Filename"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Control type="text" name="content"  as="textarea" value={this.state.content} onChange={(e) => this.handleChange(e)} rows={5} ref="content" placeholder="Content"/>
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

  export default UpdateGistForm;
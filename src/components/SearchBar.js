import React, {Component} from "react";
import {Form, Button} from "react-bootstrap";
import {FaSearch} from "react-icons/fa"
import {withRouter, Redirect} from "react-router-dom";
import "./styles/Searchbar.css";

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.username = React.createRef()
    }
    
    //With the function handleSubmit we search for a user by his Username, in order to obtain the information related to the user.
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.username.current.value);
        if(this.username.current.value !== ""){
            this.props.history.push(`/${this.username.current.value}`)
        
        }
    }

   //
    render(){
        return(
            <Form className = "SearchBar d-flex" onSubmit={this.handleSubmit}> 
                <Form.Control type="text" className="mr-2 inputSearch" placeholder="Search" ref = {this.username}/>
                    <Button variant="dark" className="buttonSearch btn my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>
                        <FaSearch/>
                    </Button>
            </Form>
        )
    }
}

export default withRouter(SearchBar);
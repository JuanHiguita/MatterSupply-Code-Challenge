import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";
import logo from "../images/GithubWhiteLogo.png";
import SearchBar from "./SearchBar";
import Login from "./Login";
import "./styles/Navbar.css";

class PageNavbar extends Component {
    render(){
        let{handleLogin, handleSubmit, isLogged, user} = this.props
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark" className="Navbar">
                <Container fluid className="Navbar-container">
                    <Navbar.Brand>
                        <Link className="Navbar__brand" to="/">
                            <img className="Navbar__brand-logo" src={logo} alt="logo"></img>
                        </Link>    
                    </Navbar.Brand>
                    <Navbar.Toggle className="responsive-menu-toggle" aria-controls="responsive-menu"/>
                    <Navbar.Collapse id="responsive-menu">
                        <Nav className="me-auto">
                            {/*from app.js we send the handleSubmit function to the component that will need to call it*/}
                            <SearchBar handleSubmit = {handleSubmit}/>
                        </Nav>
                        <Nav >
                            {
                                //check if the user is already logged to make the component switch
                                isLogged?(
                                    <div className="user">
                                        <img className="loggedUser" src={user.avatar_url}/>
                                        <Link className="userName" to={`/profile/${user.login}`}>{user.login}</Link>
                                    </div>
                                ):(
                                 /*from app.js we send the handleLogin function to the component that will need to call it*/
                                <Login handleLogin = {handleLogin} />)
                            }  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default PageNavbar;
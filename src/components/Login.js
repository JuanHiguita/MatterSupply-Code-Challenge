import userEvent from "@testing-library/user-event";
import { Button } from "bootstrap";
import React, {Component} from "react";
import GithubLogin from "react-github-login";
import logo from "../images/GithubWhiteLogo.png";
import "./styles/Login.css";

class Login extends Component {
    render(){
        //login button
        const {handleLogin}=this.props;

    return(
            <GithubLogin clientId="be2dcada6737cb9eb6a9"
            onSuccess={handleLogin}
            className="git-login"
            scope="user,gist"
            valid={true}
            redirectUri="http://localhost:3000/login"> <img className="github-logo" src={logo}></img>Sign In</GithubLogin>  
    )}

}

export default Login;
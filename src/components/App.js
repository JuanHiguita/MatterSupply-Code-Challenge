import React, {Component} from "react";
import './styles/App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import PageNavbar from "./Navbar";
import Routes from "../Routes";
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "./Layout";


class App extends Component {
  constructor(){
    super();
    this.state={
        searchedUserGists: [],
        loading: true,
        isLogged: false,
        user: "",
        searchedUser: "",
        code: "",
        userToken:""
    }
}

  //
  componentDidMount(){
    if (this.state.code){
        this.getToken(this.state.code)
        this.getUser()
    }
  }

  //get the gists of the user we are looking for
  getGists=(username)=>{
    this.setState({loading:true});
    if(username !== ""){
        
        fetch(`https://api.github.com/users/${username}/gists`)
        .then(response => response.json())
        .then(response => this.setState({searchedUserGists: response, loading: false}))
        .catch(function(error){
            console.log(error);
        });
    }
  }

  //control when the form has been submitted 
  handleSubmit=(username)=>{
    this.getGists(username);
    
  }
  //get the code from github API to get the token of the logged in user
  getToken=(code)=>{
    fetch(`https://codechallenge1.herokuapp.com/authenticate/${code}`)
    .then(response => response.json())
    .then(res => {
    if (res.token){
      this.setState({
        isLogged: true
      })
    //
      this.setState({userToken: res.token})
      this.getUser(this.state.userToken)
}
})}
  //get the authorization token from the logged user
  getUser=(token)=>{
    //console.log(token);
    fetch('https://api.github.com/user',{
        method: 'GET',
        headers:{
            Authorization: `token ${token}`
        }
    })
    .then(response => response.json())
    .then(res => this.setState({user: res}))
}
  //login button controller 
  handleLogin = (e) => {
      this.setState({code: e.code})
      this.getToken(this.state.code)
  }

  //we send via props all the state data or functions to the respective components that will make use of it
  render() {
    return(
      <Router>
        <PageNavbar handleLogin = {this.handleLogin} handleSubmit = {this.handleSubmit} isLogged = {this.state.isLogged} user = {this.state.user} logOut = {this.logOut}/>
        <Layout isLogged={this.state.isLogged} userToken={this.state.userToken}>
          <Routes searchedUserGists={this.state.searchedUserGists} loading={this.state.loading} isLogged={this.state.isLogged} user={this.state.user} searchedUser={this.state.searchedUser} userToken={this.state.userToken}/>
        </Layout>
      </Router>
    );
    }
}

export default App;

import React, {Component, Fragment} from "react";
import LoadingPage from "../components/LoadingPage";
import Error from "../components/Error";
import OwnGist from "../components/OwnGist"

class UserProfile extends Component {

    state = {
        gists: [],
        loading: true
    }

    componentDidMount(){
        this.getGists(this.props.token);
    }
    //we make the request to the API to get the gists of the logged user, and we display them
    getGists = (token)=>{
        this.setState({loading: true})
        if(token !== ""){ 
            fetch(`https://api.github.com/gists`,{
                headers:{
                    'Accept': 'application/vnd.github.v3+json',
                    Authorization: `token ${token}`
                }
            })
            .then(response => response.json())
            .then(response => this.setState({gists: response, loading: false}))
            .catch(function(error){
                console.log(error);
            });
        }
    }

    render(){
        if (this.state.loading) {
            return <LoadingPage />;
          }
        return(
            <Fragment>
                {
                    this.state.gists.length !== 0 ? (
                        this.state.gists.map((gist,index) => {
                            const keys = Object.keys(gist.files);
                            return(
                                <OwnGist gist={gist} index={index} key={gist.id} keys={keys} token={this.props.token}/>
                            )
                        })
                    ):(
                        <Error/>
                    )
                }
                
            </Fragment>
        )
    }
}

export default UserProfile;
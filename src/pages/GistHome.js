import React, {Component, Fragment} from 'react';
import LoadingPage from "../components/LoadingPage";
import Error from "../components/Error";
import Gist from "../components/Gist";
//Css

class GistHome extends Component {

    state={
        publicGists:[],
        loading: true
    }

    componentDidMount(){
        this.getPublicGists();
        
    }
    //make a request to the API to show the last gists published
    getPublicGists=()=>{
        this.setState({loading: true});
        fetch('https://api.github.com/gists/public')
        .then(response => response.json())
        .then(res => this.setState({publicGists: res, loading: false}))
    }

    render(){
        if (this.state.loading) {
            return <LoadingPage />;
          }
        return(
            <Fragment>
                {
                    this.state.publicGists.length !== 0?(
                        this.state.publicGists.map((gist,index) => {
                            const keys = Object.keys(gist.files);
                            return(
                                <Gist gist={gist} index={index} keys={keys} gistId={gist.id}/>
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

export default GistHome;
import React, {Component, Fragment} from 'react';
import Error from "../components/Error";
import LoadingPage from '../components/LoadingPage';
import Gist from "../components/Gist";


class GistSearchedUser extends Component {
    
    //display of the gists of the user searched in the searchbar
    render(){
        if (this.props.loading) {
            return <LoadingPage />;
          }
        return(
            <Fragment>
                {
                    this.props.searchedUserGists.length !== 0?(
                        this.props.searchedUserGists.map((gist,index) => {
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

export default GistSearchedUser;
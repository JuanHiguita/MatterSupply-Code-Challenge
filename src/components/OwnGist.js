import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom';
import {Container, Dropdown, Row, Button} from "react-bootstrap";
import {DateTime} from "luxon";
import {MdMoreHoriz, MdModeEdit} from "react-icons/md";
import {BsTrash} from "react-icons/bs";
import "./styles/OwnGist.css"
import GistOverlay from "./GistOverlay";
import UpdateGist from "./UpdateGist";

class OwnGist extends Component{

    /*we make a request to the API to delete the selected gist

    to improve: make the component where all the gists are displayed to be refreshed when deleting a gist, 
    and also the change will be seen instantly, without having to reload the page. */
    deleteGist = (id, token) =>{
        if (id !== ""){
            fetch(`https://api.github.com/gists/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    Authorization: `token ${token}`
                }
            })}
    }

    //get the date of the last gist update, and do the corresponding display in the format of minutes, hours, days, months or years
    diffGistUpdateDate = (date) =>{
        let dateTime = DateTime.local();
        let updatedDate = DateTime.fromISO(date);
        let diffTime = dateTime.diff(updatedDate, ['minutes']).toObject();
        let minutesObj = diffTime.minutes
        let time = 0;

        let message="";

        let minutes = Math.round(minutesObj)

        if (minutes > 59 && minutes < 1440){
            diffTime = dateTime.diff(updatedDate, ['hours']).toObject();
            let hoursObj = diffTime.hours;
            time = Math.round(hoursObj);
            message=time + " hours ago"
        }
        else if (minutes > 1440 && minutes < 43800){
            diffTime = dateTime.diff(updatedDate, ['days']).toObject();
            let daysObj = diffTime.days;
            time = Math.round(daysObj);
            message=time + " days ago"
        }
        else if (minutes > 43800 && minutes < 525600) {
            diffTime = dateTime.diff(updatedDate, ['months']).toObject();
            let monthsObj = diffTime.months;
            time = Math.round(monthsObj);
            message=time + " months ago"
        }
        else if(minutes > 535600){
            diffTime = dateTime.diff(updatedDate, ['years']).toObject();
            let yearsObj = diffTime.years;
            time = Math.round(yearsObj);
            message=time + " years ago"
        }
        else {
            time = Math.round(minutesObj)
            message=time + " minutes ago"
        }

        return(message)
    }

    render(){
        let {gist, keys, token} = this.props;
        
        //this gist container is similar to the public gist container with the particularity 
        //that the logged user has the option to update and delete his own gists.
        let renderGist = Object.values(gist.files)[0].language === "Markdown" || Object.values(gist.files)[0].language === "HTML";
        return(<Fragment>
            {
                renderGist && (
                    <Container fluid="sm" className="gistContainer">
                        <Row className="gistHeader">
                            <img className="userImage" alt="userImage" src={gist.owner.avatar_url}></img>
                            <div className="gistInfo">
                                <Link className="userName" to="/"><b>{gist.owner.login}</b></Link>&nbsp;/&nbsp; 
                                <Link className="gistName" to={`/gist/${gist.id}`}>{Object.values(keys)[0].substring(0,20)}</Link>
                            </div>
                            <p className="updatedDate">Updated {this.diffGistUpdateDate(gist.updated_at)}</p>
                        </Row>
                        <Row>
                            <div className="gistData">
                                <Link to={`/gist/${gist.id}`}>
                                    <GistOverlay className="gistData" file={gist.files} />
                                </Link>
                            </div>
                        </Row>
                        <Dropdown autoClose={true} className="dropdownMenu">
                                <Dropdown.Toggle id="dropdown-basic">
                                    <MdMoreHoriz/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item><UpdateGist userToken={token} gist={gist}/></Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="delete" as="button" onClick={(e)=>this.deleteGist(gist.id, token)}><BsTrash/> Delete Gist</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    </Container>
                )
            }
        </Fragment>)
    }
}

export default OwnGist;
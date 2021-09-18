import React, {Component, Fragment} from "react";
import {Link} from 'react-router-dom';
import {Container, Col, Row} from "react-bootstrap";
import {DateTime} from "luxon";
import "./styles/Gist.css"
import GistOverlay from "./GistOverlay";

class Gist extends Component{

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
        let {gist, keys} = this.props;
        //choose only the gists that are in Markdown or HTML language
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
                    </Container>
                )
            }
        </Fragment>)
    }
}

export default Gist;
import React,{Component, Fragment} from "react";
import ReactMarkdown from "react-markdown";
import {Container, Button} from "react-bootstrap";
import {IoArrowBackCircleSharp} from "react-icons/io5";
import LoadingPage from "../components/LoadingPage";
import "./styles/GistContent.css";


class GistContent extends Component {
    
    state = {
        gist: null,
        content: "",
        language: "",
        loading: true
    }

    componentDidMount(){
        let id = this.props.location.pathname.replace('/gist/','')
        this.getGist(id)
    }
    //we get the data of the selected gist
    getGist = (id) => {
        this.setState({loading: true});
        fetch(`https://api.github.com/gists/${id}`)
        .then(response => response.json())
        .then(response => this.setState({gist: response}, ()=>this.getContent()))
        .catch((error)=>console.log(error));
    }
    //we get and save in the state the language and the content of the gist to be displayed on the window
    getContent = () => {
        let gist = Object.values(this.state.gist.files)[0].raw_url;
        let gistLanguage = Object.values(this.state.gist.files)[0].language;
        this.setState({language: gistLanguage})
        fetch(gist)
        .then(response => response.text())
        .then(text => this.setState({content: text, loading: false}));
    }

    render(){
        if (this.state.loading) {
            return <LoadingPage />;
          }
        //we do the display of the gist content, and according to the language we handle it in the correct way
        return(
            <Fragment>
                <Container fluid="sm">
                    <Container fluid="sm" className="content">
                        {
                            this.state.language === "Markdown"?(
                                <ReactMarkdown>{this.state.content}</ReactMarkdown>
                            ):(
                                <pre>{this.state.content}</pre>
                            )
                        }
                    </Container>
                    <Button variant="dark" className="backButton" onClick={()=>this.props.history.goBack()}><IoArrowBackCircleSharp/> Go Back</Button>
                </Container>
            </Fragment>
        )
    }
}

export default GistContent;
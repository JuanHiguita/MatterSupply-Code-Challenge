import React, {Component, Fragment} from "react";
import ReactMarkdown from "react-markdown";
import "./styles/GistOverlay.css";

class GistOverlay extends Component{

    state = {
        markdown:"",
        html: "",
        link: ""
    }
    /*we control if the format of the gist is html or markdown, additional we get the content of the gist. 
    Depending on the language of the gist we make the necessary display in case of being Markdown this must be manipulated 
    by another component to give the respective appearance. Finally because it is a preview of the gist, we only show the first 135 characters.*/
    componentDidMount(){
        if(this.props){
            let link =  Object.values(this.props.file)[0].raw_url;
            let language = Object.values(this.props.file)[0].language;
            if (language === "Markdown"){
                this.getMarkdown(link);
            }else{
                this.getHTML(link);
            }
        }
    }
   
    getMarkdown=(link)=>{
        fetch(link)
        .then(response => response.text())
        .then(text => this.setState({markdown: text}))
    }

    getHTML=(link)=>{
        fetch(link)
        .then(response => response.text())
        .then(text => this.setState({html: text}))
    }

    render(){

        let {file} = this.props;
        let language = Object.values(file)[0].language;

        return(
            <Fragment>
                {
                    language==="Markdown"?(  
                        <div className="overlay">
                            <ReactMarkdown>{this.state.markdown.substring(0,135)}</ReactMarkdown>
                        </div>
                    ):(
                        <div className="overlay">
                            <pre>{this.state.html.substring(0,135)}</pre>
                        </div>
                    )
                }
            </Fragment>
            );
    }
}

export default GistOverlay
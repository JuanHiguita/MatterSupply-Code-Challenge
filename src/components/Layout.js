import React, {Fragment} from "react";
import CreateGist from "./CreateGist"

function Layout(props) {
    let {isLogged, userToken} = props;
    return(
        <Fragment>
            {
                props.children
            }
            {
                isLogged === true?(
                    <CreateGist userToken={userToken}/>
                ):(<p></p>)
            }
        </Fragment>
    )
}

export default Layout;
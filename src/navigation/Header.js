import React from "react";
import { 
    Header as HeaderComponent, 
    ConnectedComponent as connect 
} from "../components";

class Header extends React.Component {
    render() {
        return (
            <HeaderComponent {...this.props}/>
        );
    }
}

export default connect(Header);
import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        UserService.getMenuContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {
        return (
            <div class="navbar-nav mr-auto">
                {this.state.content.map(c => {
                    return (<li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href={"/category/" + c.id} id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {c.name}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {c.categories.map(s => (<a className="dropdown-item" href={"/category/" + s.id}>{s.name}</a>))}
                            </div>
                        </li>)
                })}
            </div>
        );
    }
}
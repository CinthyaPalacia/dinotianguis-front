import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class CategoryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        UserService.getCategoryContent(this.props.match.params.id).then(
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
            <div class="products card-columns">
                {this.state.content.map((product, key) => {
                    return (
                        <div className="card">
                            <img class="card-img-top" src={'http://localhost:8080' + product.image} alt="Card cap" />
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a href={"/product/" + product.sku }>
                                        {product.name}
                                    </a>
                                </h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
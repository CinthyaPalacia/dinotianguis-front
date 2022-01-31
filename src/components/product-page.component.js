import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        UserService.getProductContent(this.props.match.params.id).then(
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
        const product = this.state.content;console.log(product);
        return (
            <div class="product row mt-5">
                <div class="col-sm-5">
                    <img className="card-img-top" src={'http://localhost:8080' + product.image} alt="Card cap"/>
                </div>
                <div class="col-sm-7">
                    <h3 class="my-4">{product.name}</h3>
                    <small class="my-2">sku: {product.sku}</small>
                    <div class="my-2">Marca: {product.brand}</div>
                    {product.price > product.finalPrice && <div className="h6">${product.price}</div>}
                    <div class="h1">${product.finalPrice}</div>
                </div>
                <div className="description p-5">
                    {product.description}
                </div>
            </div>
        );
    }
}
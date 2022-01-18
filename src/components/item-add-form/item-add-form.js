import React, {Component} from "react";
import './item-add-form.css';

export default class ItemAddForm extends Component{

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();// Метод говорящий браузеру что действие по-умолчанию (обновление страницы) выполнять не нужно.
        this.props.onItemAdded(this.state.label);
        this.setState({label: ''});
    };

    render() {
        //const { onItemAdded } = this.props;

        return(
            <form
                className="item-add-form d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="What need to be done"
                    value={this.state.label}/>
                <button
                    className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        )
    }
}
import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import NationalitySelect from "./NationalitySelect";
import GenderRadioButton from "./GenderRadioButton";
import FooterForm from "./FooterForm";
import getToken from "../../../functions/getToken";
import Switch from "./Switch";
import admin from "firebase-admin";
import SelectableContext from "react-bootstrap/cjs/SelectableContext";
const token = getToken();

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: token,
            dataType: this.props.dataType,
            create: "POST",
            edit: "PUT",
            data: {"firstname": "", "lastname": "", "username": "", "email": "", "delete_profile": false, "password": "", "rank": ""},
            deactivate: false,
        };
    }

    async componentDidMount() {
        if(this.props.action === 'edit'){
            await fetch(routeAPI + this.state.dataType + "/" + this.props.id, {
                headers: { 'Authorization': this.state.tokenACP },
            }).then(response => response.json())
                .then(json => {
                    if(json){
                        this.setState({
                            apiLoaded: true,
                            email: json.email,
                            firstname: json.firstname,
                            lastname: json.lastname,
                            username: json.username,
                            rank: json.rank,
                        });
                    }
                }).catch(e => {
                    console.log(e.code)
                    console.log(e.message)
                })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let id = this.props.id;
        let route = routeAPI + 'users/';
        if (id) {
            route = routeAPI + 'users/' + id
        }
        try {
            await fetch(route, {
                method: this.state[this.props.action],
                headers: {
                    'Authorization': this.state.tokenACP,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    rank: this.state.rank
                })
            })
                .then(r => {
                    console.log(r)
                    if (r.ok) {
                        this.setState({
                            toastMessage: 'The action was successfully completed',
                            toastType: 'success'
                        })
                    } else {
                        this.setState({
                            toastMessage: 'An error occurred while creating the user: ' + e.message,
                            toastType: 'error'
                        });
                    }
                });
            this.props.showToasts();
            this.props.delayToHide();
        } catch (e) {
            console.log(e)
            this.setState({
                toastMessage: 'An error occurred while creating the user: ' + e.message,
                toastType: 'error'
            });
            this.props.showToasts();
            this.props.delayToHide();
        }

    };

    handleChange = (e) => {
        e.preventDefault();
        if(e.target.type === "checkbox"){
            this.setState({
                [e.target.name]: e.target.checked
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText defaultValue={this.state.data.email} title={"Email"} name={"email"} id={"email"} placeholder={"john.doe@example.com"} type={'email'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.password} title={"Password"} name={"password"} id={"password"} placeholder={"*******"} type={'password'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <FieldText defaultValue={this.state.data.firstname} title={"First name"} name={"firstname"} id={"firstname"} placeholder={"John"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.lastname} title={"Last name"} name={"lastname"} id={"lastname"} placeholder={"Doe"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.username} title={"Username"} name={"username"} id={"username"} placeholder={"JohnDoe"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>



            <Form.Row>
                <select className={"form-control"}   name={"rank"}  onChange={this.handleChange}>
                    <option value={"admin"}> Admin</option>
                    <option value={"super_admin"}> Super-Admin</option>
                    <option value={"trader"}> Trader</option>
                </select>
            </Form.Row>

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}
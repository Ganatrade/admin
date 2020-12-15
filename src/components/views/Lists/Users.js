import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Gravatar from 'react-gravatar';
import ButtonGroupAction from "./ButtonGroupAction";
import {Link} from "react-router-dom";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "users",
            tokenACP: "",
            isLoading: false,
            data: this.props.data,
            activePage: '1',
        };
    }

    render() {
        return (
            <div>
                <Table striped bordered hover variant="dark" >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Reviews</th>
                        <th>Trades</th>
                        <th>Rank</th>
                        <th>Display Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.slice(this.props.startRange, this.props.endRange).map( (user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>
                                        <Link to={'/list/users/' + user.id + '/reviews'}>
                                        <button className={"btn-success btn-sm"}> View reviews </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={'/list/users/' + user.id + '/trades'}>
                                            <button className={"btn-success btn-sm"}> View trades </button>
                                        </Link>
                                    </td>
                                    <td>{user.rank}</td>
                                    <td>
                                        <Gravatar email={user.email} size={35} className="rounded-circle"/>&nbsp;
                                        {user.firstname} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <ButtonGroupAction data={this.props.data} id={user.uid} type="users"/>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default (Index);

import React, { Component } from "react";
//import { is } from "@babel/types";
import {withRouter} from 'react-router-dom'


class Splash extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
        }
    }

    componentDidMount(){
        const token = localStorage.getItem("token");
        
        if(token){
            this.verifyToken(token);
        }
        else{
            this.props.history.push("/login")
        }
    }

    verifyToken = (token) =>
    {
        let config ={
            method : `GET`,
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        fetch('https://reactcourseapi.herokuapp.com/verifytoken', config)
            .then(res => {
                if(res.ok){
                    this.setState({
                        loading: false,
                    })
                }
                else{
                    localStorage.removeItem('item');
                    this.props.history.push("/login");

                }
            })
    }

    render(){
        const splash = (
            <div className = "full-centered">
                <h1>Cargando...</h1>
            </div>

        );
        return this.state.loading ? splash : this.props.children
        
    }
}

export default withRouter(Splash);
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
 
import '../App.css'

class Login extends Component{
    constructor(props){
        super(props);
    }

   
    render(){
      
        return(
            <React.Fragment>
                <div class="container">

                    <h1>Login Page</h1>
                </div>
            
            </React.Fragment>
        )

    }

}

export default Login;
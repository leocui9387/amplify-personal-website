import React, { Component, useEffect, useState } from 'react';
import {
  Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Pages } from '../AppRoutes';
// import { SignUp, signIn } from '@aws-amplify/auth';


function LoginStateButton(){
  // https://stackoverflow.com/questions/63519495/react-how-to-toggle-background-color-of-just-one-button
  const [buttonState, setButtonState] = useState({color:"primary", text:"Sign In"});
  const [loginState, setLoginState] = useState({username:null,authenticated:false,failed:false});

  function handleButton(){
    // setLoginState({username:"leo",authenticated:true,failed:false});  

    if(loginState.authenticated){
      setButtonState({color:"success", text:`Welcome : ${loginState.username}`});
      setLoginState({username:"leo",authenticated:false,failed:true});  

    }else{
      if (loginState.failed){
        setButtonState({color:"danger", text:"Log In Failed"});
        setLoginState({username:"leo",authenticated:false,failed:false});  
      }else{
        setButtonState({color:"warning", text:"Sign In"});
        setLoginState({username:"leo",authenticated:true,failed:false}); 
      }
    }
  }

  

  return (<Button onClick={handleButton} color={buttonState.color}>{buttonState.text}</Button>);
}

export class NavMenu extends Component {
  
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {

    var linkz = { ss: [], pr: [] };
    Pages.forEach((item) => {
      if (item.path[0] === "self-study")
        return linkz.ss.push(item);
      if (item.path[0] === "personal-reference")
        linkz.pr.push(item);
    },);

    function listFactory(array) {
      return array.map((item) => {
        return (
          <DropdownItem tag={Link} key={item.id}
            to={item.path.reduce((a, n) => { return `${a}/${n}` }, "")}
          >
            {item.title}
          </DropdownItem>
        );
      })
    }


    


    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">
            <img alt="" src={"https://basic-bear-engineering.s3.amazonaws.com/images/base-site/BasicBearSquare.png"} style={{ height: "1.5em", borderRadius: ".3em" }} />
            &ensp;Basic Bear Engineering
          </NavbarBrand>
          <LoginStateButton/>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Self Study
                </DropdownToggle>
                <DropdownMenu end>
                  {listFactory(linkz.ss)}
                </DropdownMenu>
              </UncontrolledDropdown>


              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  References
                </DropdownToggle>
                <DropdownMenu end>
                  {listFactory(linkz.pr)}
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <NavLink tag={Link} to="/curriculum-vitae">CV</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/new-entry">New Entry</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

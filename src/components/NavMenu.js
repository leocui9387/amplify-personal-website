import React, { Component } from 'react';
import {
  Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from "../images/BasicBearSquare.png";

import { Pages } from '../AppRoutes';

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
            <img alt="" src={logo} style={{ height: "1.5em", borderRadius: ".3em" }} />
            &ensp;Basic Bear Engineering
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
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
                <NavLink tag={Link} className="text-dark" to="/curriculum-vitae">CV</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/new-entry">New Entry</NavLink>
              </NavItem>

            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

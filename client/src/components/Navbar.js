/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Container,
  Navbar as BootstrapNavbar,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import navItems from '../data/nav-items';
import cn from 'classnames';
import {
  navbar,
  logo,
  navLink,
  isWhite,
  isNotHome,
  newTag,
  newLink,
  navbarOpen
} from './Navbar.css';
import logoImg from '../images/SVG/nav-logo.svg';
import Avatar from './Avatar';
import {isServer} from '../utils';
import {REVERSIM_SUMMIT} from '../utils';
import { getLoginUrl } from "./Redirect";
import newImg from '../images/new-nav-tag.png';
import LinkDuo from './LinkDuo';
import styled from 'styled-components';

// import {Container} from './GlobalStyledComponents/Container';

// styled-components section
const NavbarContainer = styled.div`
  nav  {
    padding: 25px 30px;
    ${props => {
      if(props.isColored){
        return (
          'background: rgba(81, 39, 255, 0.9); \n transition: background 0.3s;'
          )
        };
      }
    };
  };
`;

// React.js componenets section

const GetTicketsCTA = () => (
  <a href="https://ti.to/reversim-summit/2019" className="unstyled-link">
    <Button className="styled-button on-purple w-max-content">
      Get Tickets
    </Button>
  </a>
);

const NavbarItem = ({to, text, external, pathname}) => {
  let navLinkClass = cn('nav-link', navLink, {active: pathname === `/${to}`});
  const isNew = to === 'sponsors'
  return (
    <li key={to} className="text-white ml-lg-5 font-weight-bold font-size-md">
      <LinkDuo className={cn(navLinkClass, isNew? newLink: '')} to={to} external={!!external}>
        {isNew && <img className={newTag} src={newImg}/>}
        {text}
      </LinkDuo>
    </li>
  );
};

class Navbar extends Component {
  state = {
    isOpen: false,
    fixed: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentWillMount() {
    if (window.scrollY > 60) {
      this.setState({fixed: true});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const fixed = window.scrollY > 60;
    this.setState({fixed});
  };

  render() {
    const {
      isHome,
      isSmallScreen,
      user,
      onLogout,
      pathname,
      history,
      eventConfig: {
        cfp,
        voting,
      },
    } = this.props;
    const {fixed, currentPage: _currentPage} = this.state;
    const items = navItems(isHome);
    const isColored = !isHome || fixed;

    const logoEl = (
      <img className={logo} src={logoImg} onClick={() => history.push('/')} alt={REVERSIM_SUMMIT} />
    );

    const navbarBrand = isHome ? (
      <a href="/">{logoEl}</a>
    ) : (
      <Link className="navbar-brand mr-5" to="/">
        {logoEl}
      </Link>
    );

    return (
      <NavbarContainer isColored={isColored}>
        <BootstrapNavbar
          expand="lg"
          fixed="top"
        >
          <Container>
            <div className="d-flex justify-content-between w-100">
              {navbarBrand}
              <NavbarToggler onClick={this.toggle} className="ml-auto" />
            </div>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav
              navbar
              className={cn('ml-auto align-items-end p-3 p-lg-0', navbarOpen)}
              >
                {!isSmallScreen && <li> <GetTicketsCTA /> </li>}
                {cfp && isSmallScreen && pathname !== '/cfp' && (
                  <NavbarItem 
                    text="Submit session" 
                    to="cfp"
                  />
                )}
                {voting && isSmallScreen && pathname !== '/my-votes' && (
                  <NavbarItem 
                    text="VOTE FOR SESSION" 
                    to="proposals"
                  />
                )}
                {items.map(item => (
                  <NavbarItem 
                    key={`navbar-i-${item.to}`}
                    pathname={pathname}
                    {...item} 
                  />
                ))}
                { voting && (
                  <NavbarItem
                    key={`navbar-i-proposals`}
                    pathname={pathname}
                    {...{to: 'proposals', text: 'Proposals'}}
                  />
                )}
                {isSmallScreen && user}
                {!user && (
                  <NavbarItem
                    to={getLoginUrl()}
                    text="Login"
                    external={true}
                  />
                )}
                {!isServer && isSmallScreen && user && (
                  <li>
                    <div className="ml-5">
                      {<Avatar {...user} onLogout={onLogout} />}
                    </div>
                  </li>
                )}
              </Nav>
            </Collapse>
          </Container>
        </BootstrapNavbar>
      </NavbarContainer>
      
    );
  }
}


export default Navbar;

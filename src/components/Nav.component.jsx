import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <NavbarContainer>
      <Navbar>
        <div>
          <Links to="/">Home</Links>
          <Links to="/signup">Signup</Links>
        </div>
        <div>
          <Links to="/profile">Profile</Links>
        </div>
      </Navbar>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  width: 100%;
  padding: 1rem 1.5rem;
  background: #2d2d30;
  height: 3.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`;

const Links = styled(NavLink)`
  text-decoration: none;
  font-weight: bold;
  color: white;
`;

const Navbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

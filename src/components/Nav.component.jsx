import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Title } from '../pages/Home';

export default function Nav() {
  const { user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'USER_DETAILS_RESET' });
  };

  return (
    <NavbarContainer>
      {!user ? (
        <Navbar>
          <div>
            <Links to="/">
              <Title
                style={{
                  fontSize: '1.9rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}
              >
                Hiredevs
              </Title>
            </Links>
          </div>
          <div>
            <Links to="/signup">Signup</Links>
          </div>
        </Navbar>
      ) : (
        <Navbar>
          <div>
            <Links to="/dashboard">
              <Title
                style={{
                  fontSize: '1.9rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                }}
              >
                Hiredevs
              </Title>
            </Links>
          </div>
          <RightItems>
            <Links to="/profile">
              <Avatar image={user.avatar} />
            </Links>

            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </RightItems>
        </Navbar>
      )}
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

const Avatar = styled.div`
  background-image: url(${(props) => props.image});
  width: 30px;
  height: 30px;
  margin-right: 7px;
  border-radius: 50%;
  background-size: contain;
`;

const LogoutButton = styled.button`
  border: none;
  padding: 3px 13px;
  background-color: white;
  color: #2d2d30;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  /* box-sizing: border-box; */
  border-radius: 19px;
  &:hover {
    background-color: #ccc;
  }
`;

const RightItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

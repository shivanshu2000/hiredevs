import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import axios from 'axios';

import User from '../components/User.component.jsx';

const tags = [
  'react',
  'vue',
  'angular',
  'node',
  'express',
  'django',
  'go',
  'python',
  'javascript',
];

export default function Explore() {
  const { user } = useSelector((state) => state.userDetails);
  const [username, setUsername] = useState('');
  const [usersFetching, setUsersFetching] = useState(false);

  const [users, setUsers] = useState([]);

  const history = useHistory();
  useEffect(() => {
    if (!user) {
      return;
    }
    setUsersFetching(true);

    axios
      .get(`http://localhost:8080/api/users/?username=${username}`)
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
          setUsersFetching(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setUsersFetching(false);
      });
  }, [history, user, username]);

  const getUser = () => {
    console.log(username);
  };

  if (!user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <SearchContainer>
        <SearchBox>
          <Input
            onChange={(e) => setUsername(e.target.value.trim())}
            value={username}
            placeholder="Search by username"
          />
          <Button
            disabled={username.trim().length === 0}
            className={username.trim().length === 0 && 'disable'}
            onClick={getUser}
          >
            Search
          </Button>
        </SearchBox>
      </SearchContainer>
      <Wrapper>
        <UsersContainer>
          {usersFetching ? (
            <div>Loading...</div>
          ) : (
            <>
              {users.map((user) => (
                <User
                  key={user._id}
                  username={user.username}
                  technologies={user.technologies}
                  image={user.avatar}
                />
              ))}
            </>
          )}
        </UsersContainer>
        <TagsContainer>
          <div style={{ marginBottom: '7px' }}>Popular tags</div>
          <hr />
          <div style={{ marginTop: '7px' }}>
            {tags.map((tag, i) => (
              <Tag key={i}>#{tag}</Tag>
            ))}
          </div>
        </TagsContainer>
      </Wrapper>
    </div>
  );
}

const SearchContainer = styled.div`
  border: 1px solid #ccc;

  padding: 0.5rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 1rem 1rem;
  padding: 0.5rem;
`;
const SearchBox = styled.div`
  max-width: 350px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  overflow: hidden;
  border-radius: 25px;

  /* margin-left: 5rem; */
`;

const TagsContainer = styled.div`
  min-height: 200px;
  border-radius: 13px;
  border: 1px solid #ccc;
  margin-top: 1.5rem;
  padding: 1rem 0.5rem;
`;

const Input = styled.input`
  border: none;
  border-right: none;
  padding: 0.6rem 0 0.6rem 0.5rem;
  border-radius: 25px;
  border: 1px solid #ccc;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  @media only screen and (min-height: 265px) {
    flex: 1;
  }
  @media only screen and (max-width: 265px) {
    width: 70%;
  }

  @media only screen and (max-width: 238px) {
    padding: 0.2rem 0 0.2 0.2rem;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  color: white;
  background-color: #12609e;
  padding: 0.65rem 1.5rem 0.65rem 0.5rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;

  &.disable {
    background-color: #ccc;
  }

  @media only screen and (max-width: 238px) {
    padding: 0.7rem 0 0.7rem 0;
  }
`;

const UsersContainer = styled.div`
  margin-top: 2.5rem;
  padding: 0.5rem;
`;

const Tag = styled.div`
  display: inline-block;
  border: 17px;
  padding: 3px 5px;
  border-radius: 3px;
  background-color: #ccc;
  font-size: 12px;
  margin: 3px 3px;
  cursor: pointer;
`;

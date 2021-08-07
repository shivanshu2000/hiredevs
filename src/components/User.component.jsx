import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Avatar } from '../components/Nav.component.jsx';

export default function User({ username: name, image, technologies }) {
  const [username] = useState(name);
  const { user } = useSelector((state) => state.userDetails);

  const history = useHistory();
  console.log(useHistory());
  const navigateToUser = () => {
    console.log(username);
    if (user.username === username) {
      console.log('true');
      return history.push('/profile');
    }

    return history.push(`/user/${username}`);
  };

  return (
    <SingleUser style={{ cursor: 'pointer' }} onClick={navigateToUser}>
      <LeftPart>
        <Avatar width={15} height={15} image={image} />
        <div style={{ fontSize: '11px' }} className="user__name">
          {username}
        </div>
      </LeftPart>
      <div>
        {' '}
        {technologies.slice(0, 3).map((t, i) => (
          <Pill key={i}>{t}</Pill>
        ))}
      </div>
    </SingleUser>
  );
}

const SingleUser = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 7px 5px;
  border-radius: 13px;
  margin: 5px 0;

  & > div.user__name {
    margin-left: 7px;
  }
`;

const Pill = styled.div`
  display: inline-block;
  text-align: center;
  font-size: 13px;
  border-radius: 7px;
  padding: 3px 7px;
  margin: 0 2px;
  background-color: #ccc;
  color: black;
`;

const LeftPart = styled.div`
  display: flex;
  align-items: center;
`;

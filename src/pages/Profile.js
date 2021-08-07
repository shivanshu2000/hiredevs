import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Pill } from '../components/DeveloperSignup.component.jsx';
import { Divider } from './DeveloperDashboard.js';

export default function Profile() {
  const { user } = useSelector((state) => state.userDetails);

  if (!user || user.userType === 'client') {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <TopContainer>
        <AvatarContainer>
          <Avatar image={user.avatar} />
          <div>{user.username}</div>
        </AvatarContainer>
        <RightContainer>
          <RightContainerCard>
            <Title>Total </Title>
            <Amount>42</Amount>
          </RightContainerCard>
          <RightContainerCard>
            <Title>Completed</Title>
            <Amount>19</Amount>
          </RightContainerCard>
        </RightContainer>
      </TopContainer>
      <PostsContainer>
        <Post>
          <div>hello</div>
          <div>Project1</div>
        </Post>
        <Post>
          <div>hello</div>
          <div>Project1</div>
        </Post>
        <Post>
          <div>hello</div>
          <div>Project1</div>
        </Post>
        <Post>
          <div>hello</div>
          <div>Project1</div>
        </Post>
        <Post>
          <div>hello</div>
          <div>Project1</div>
        </Post>
        <Post>
          <div>hello</div>
          <div>Project1</div>
        </Post>
      </PostsContainer>
      <TechnologiesContainer>
        <div
          style={{
            color: '#12609e',
            textAlign: 'center',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Technologies {user.username} know
        </div>
        <Divider />
        <Technologies>
          {user.technologies.map((t, i) => (
            <Pill className="user__pill">{t}</Pill>
          ))}
        </Technologies>
      </TechnologiesContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2.5rem;
  padding: 1rem;
`;
const Technologies = styled.div`
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  justify-content: center;
  & > div.user__pill {
    text-align: center;
    border-radius: 15px;
    background-color: #12609e;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #12609e90;
      transform: translateY(-1px);
    }
  }
`;
const TechnologiesContainer = styled.div`
  margin-top: 2.5rem;
  padding: 1rem 0;
  border-radius: 13px;
  border: 1px solid #ccc;
`;
const PostsContainer = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 13px;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 5px;
    width: 2px;
  }
`;

const Avatar = styled.div`
  background-image: url(${(props) => props.image});
  width: 150px;
  height: 150px;
  margin-right: 7px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
  @media only screen and (max-width: 445px) {
    width: 50px;
    height: 50px;
  }
`;

const Post = styled.div`
  border: 1px solid #ccc;
  border-radius: 13px;
  padding: 1rem;
  /* width: 150px; */
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  @media only screen and (max-width: 300px) {
    max-width: 250px;
  }
`;
const RightContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 1.5rem;
  align-items: center;

  padding: 0 1rem;
  border-radius: 13px;
  min-width: 150px;

  @media only screen and (max-width: 610px) {
    min-width: 100px;
  }

  @media only screen and (max-width: 300px) {
    min-width: 50px;
  }
`;

export const Title = styled.div`
  margin: 2.5rem 0 7px 0;
  text-transform: uppercase;
  font-weight: 600;
  color: #12609e;
`;
export const Amount = styled.div`
  margin: 5px 0;
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
  grid-gap: 1rem 1rem;

  @media only screen and (max-width: 610px) {
    display: flex;
    justify-content: space-around;
  }

  @media only screen and (max-width: 445px) {
    flex-direction: column;
  }
`;

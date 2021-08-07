import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import { Pill } from '../components/DeveloperSignup.component.jsx';
import { Divider } from './DeveloperDashboard.js';
import Backdrop from '../components/Backdrop.component.jsx';
import Modal from '../components/Modal.component.jsx';
import TextInput from '../components/CustomInput.component';

export default function Profile() {
  const { user } = useSelector((state) => state.userDetails);
  const { token } = useSelector((state) => state.userToken);

  const [render, setRender] = useState(false);
  const [userData, setUserData] = useState(null);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState(false);

  const isUsername = useParams().username;
  const username = isUsername ? isUsername : user?.username;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${username}`).then((res) => {
      if (res.data.success) {
        setUserData(res.data.userData);

        setRender(true);
      }
    });
  }, [username]);

  useEffect(() => {
    setFetchedPosts(false);
    axios
      .get(`http://localhost:8080/api/posts/${username}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.posts);
          setFetchedPosts(true);
          console.log(res.data.posts);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setFetchedPosts(true);
      });

    return function () {
      setFetchedPosts(false);
    };
  }, [token, username]);

  const handlePost = async (data) => {
    try {
      axios
        .post(
          'http://localhost:8080/api/posts',
          {
            ...data,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.post);
            setPosts((prevState) => setPosts([...prevState, res.data.post]));
            setShow(false);
          }
        });
    } catch (err) {
      console.log(err);
      console.log(err.response.data.error);
    }
  };

  if (!render) return <div>Loading...</div>;

  if (!user) {
    return <Redirect to="/dashboard" />;
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter title'),
    description: Yup.string().required('Please enter a description'),
  });

  return (
    <Container>
      {show && <Backdrop setShow={setShow} />}
      {show && (
        <Modal open={show}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              title: '',
              description: '',
              webUrl: '',
              repoLink: '',
            }}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
              try {
                await handlePost(data);
                resetForm();
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({ isSubmitting, dirty, isValid }) => (
              <Form>
                <TextInput
                  label="Title:"
                  name="title"
                  placeholder="Enter project title"
                />

                <TextInput
                  label="Description:"
                  name="description"
                  placeholder="Enter project description"
                />

                <TextInput
                  label="Website url (optional):"
                  name="webUrl"
                  type="text"
                  placeholder="Enter an username"
                />
                <TextInput
                  label="Github repo link (optional):"
                  name="repoLink"
                  type="text"
                  placeholder="Enter your github's username"
                />

                <Button
                  style={{
                    margin: '0 auto',
                    borderRadius: '25px',
                    padding: '9px 15px',
                  }}
                  disabled={!dirty || !isValid}
                  type="submit"
                >
                  Add post
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
      <TopContainer>
        <AvatarContainer>
          <Avatar image={userData.avatar} />
          <div>{userData.username}</div>
        </AvatarContainer>
        <RightContainer>
          <RightContainerCard>
            <Title>Total </Title>
            <Amount>{userData.total}</Amount>
          </RightContainerCard>
          <RightContainerCard>
            <Title>Completed</Title>
            <Amount>{userData.completed}</Amount>
          </RightContainerCard>
        </RightContainer>
      </TopContainer>
      <PostsWrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            padding: '5px 0',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              flex: 1,
              color: '#12609e',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            {username}'s posts
          </div>
          {!isUsername && (
            <div>
              <Button onClick={() => setShow(true)}>Create post</Button>
            </div>
          )}
        </div>
        <br />
        <hr />

        {fetchedPosts && posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            No post available to see
          </div>
        )}
        {posts.length > 0 && (
          <PostsContainer className="posts__container">
            {fetchedPosts ? (
              <>
                {posts.map((post) => (
                  <Post key={post._id}>
                    <PostTitle>{post.title}</PostTitle>
                    <Description>{post.description}</Description>
                  </Post>
                ))}
              </>
            ) : (
              <div>Loading...</div>
            )}
          </PostsContainer>
        )}
      </PostsWrapper>
      <TechnologiesContainer>
        <div
          style={{
            color: '#12609e',
            textAlign: 'center',
            fontWeight: '600',
            textTransform: 'uppercase',
          }}
        >
          Technologies {userData.username} know
        </div>
        <Divider />
        <Technologies>
          {userData.technologies.map((t, i) => (
            <Pill style={{ marginTop: '15px' }} key={i} className="user__pill">
              {t}
            </Pill>
          ))}
        </Technologies>
      </TechnologiesContainer>
    </Container>
  );
}

const Description = styled.div`
  color: #808080;
  font-size: 14px;
`;
const PostTitle = styled.div`
  color: #12609e;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Container = styled.div`
  margin-top: 2.5rem;
  padding: 1rem;
`;
const Technologies = styled.div`
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin-top: 1rem;
  padding: 0 5px 0 0;
  height: 250px;

  overflow-y: scroll;

  &.posts__container::-webkit-scrollbar {
    height: 6px;
    width: 2px;
  }
  &.posts__container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  &.posts__container::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }
`;

const PostsWrapper = styled.div`
  display: flex;
  padding: 1rem;
  border: 1px solid #ccc;
  flex-direction: column;
  margin-top: 2.5rem;
  border-radius: 13px;
`;

const Post = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;

  padding: 0.5rem;
  min-height: 150px;
`;
const Button = styled.button`
  border: none;
  margin-left: auto;
  display: block;
  background-color: #12609e;
  color: white;
  cursor: pointer;
  border-radius: 9px;
  font-weight: normal;
  padding: 9px;
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

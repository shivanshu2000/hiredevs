import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Title, Amount } from './Profile';
import {
  ProjectsContainer,
  ProjectCard,
  Heading,
  ModalDescription,
  HeadingContainer,
} from './DeveloperDashboard';

import { api } from '../constants';
import axios from 'axios';
import User from '../components/User.component';
import { Button } from '../components/Signin.component';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.component';

export default function Dashboard() {
  const { token } = useSelector((state) => state.userToken);
  const { user } = useSelector((state) => state.userDetails);
  const { dashboardDetails: details } = useSelector(
    (state) => state.userDashboardDetails
  );

  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${api}/api/users/dashboard`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          dispatch({
            type: 'USER_DASHBOARD_DETAILS_SUCCESS',
            payload: res.data.details,
          });
        }
      })
      .catch((err) => {
        console.log(err.message, err.response.data.message);
      });
  }, [dispatch, updated, token]);

  const clientAccepted = async (id, name) => {
    try {
      const res = await axios.patch(
        `${api}/api/projects/${id}`,
        {
          takenBack: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(`You have accepted "${name}"'s request.`);
        setUpdated(!updated);
      }
    } catch (err) {
      console.log(err.message, err.response.data.message);
    }
  };

  if (!user) return <Redirect to="/" />;
  if (!details) return <Loader />;

  return (
    <>
      <DashboardContainer>
        <DashboardCard>
          <Title>Total projects</Title>
          <Amount>{details.total}</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Completed</Title>
          <Amount>{details.completed}</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Remaining</Title>
          <Amount>{details.pending}</Amount>
        </DashboardCard>
      </DashboardContainer>
      <ProjectsContainer>
        <ProjectCard>
          <HeadingContainer color="#4CBB17">
            <Heading color="white">Completed projects</Heading>
          </HeadingContainer>
          <ProjectContainer style={{ padding: '0.3rem' }}>
            {details.completedProjects.length === 0 && (
              <ModalDescription>No completed projects yet</ModalDescription>
            )}
            {details.completedProjects.map((p) => (
              <Project key={p._id}>
                <div>{p.title}</div>

                <User
                  image={p.developerId.avatar}
                  username={p.developerId.username}
                >
                  {p.title}
                </User>
              </Project>
            ))}
          </ProjectContainer>
        </ProjectCard>
        <ProjectCard>
          <HeadingContainer color="#12609e">
            <Heading color="white">Pending projects</Heading>
          </HeadingContainer>
          <ProjectContainer style={{ padding: '0.3rem' }}>
            {details.pendingProjects.length === 0 && (
              <ModalDescription>No pending projects</ModalDescription>
            )}
            {details.pendingProjects.map((p) => (
              <Project key={p._id}>
                <div>{p.title}</div>

                <User
                  image={p.developerId.avatar}
                  username={p.developerId.username}
                >
                  {p.title}
                </User>
              </Project>
            ))}
          </ProjectContainer>
        </ProjectCard>
      </ProjectsContainer>
      <RequestedProjectsContainer>
        <HeadingContainer color="#F09537">
          <Heading>Pending Requests</Heading>
        </HeadingContainer>

        <Container className="pending__container">
          {details.pendingRequests.length === 0 && (
            <ModalDescription>No pending requests</ModalDescription>
          )}
          {details.pendingRequests.map((p) => (
            <PendingRequest key={p._id}>
              <Title
                style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}
              >
                <span style={{ color: 'black', fontSize: '0.8rem' }}>
                  Request for:{' '}
                </span>
                {p.title}
              </Title>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '9px',
                    fontWeight: 'bold',
                  }}
                >
                  Requested to:{' '}
                </div>
                <User
                  username={p.developerId.username}
                  image={p.developerId.avatar}
                />
              </div>
            </PendingRequest>
          ))}
        </Container>
      </RequestedProjectsContainer>
      <RequestedProjectsContainer>
        <HeadingContainer color="#4CBB17">
          <Heading>Approval Requests</Heading>
        </HeadingContainer>

        <Container className="pending__container">
          {details.requestedByDeveloper?.length === 0 && (
            <ModalDescription>No requests by developers</ModalDescription>
          )}
          {details.requestedByDeveloper?.map((p) => (
            <PendingRequest key={p._id}>
              <Title
                style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}
              >
                <span style={{ color: 'black', fontSize: '0.8rem' }}>
                  Accepting Request for:{' '}
                </span>
                {p.title}
              </Title>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '9px',
                      fontWeight: 'bold',
                    }}
                  >
                    Requested by:{' '}
                  </div>
                  <User
                    username={p.developerId.username}
                    image={p.developerId.avatar}
                  />
                </div>
                <Button
                  style={{
                    marginTop: '7px',
                    fontWeight: '400',
                    padding: '7px 9px',
                  }}
                  onClick={() => {
                    clientAccepted(p._id, p.developerId.username);
                    setUpdated(!updated);
                  }}
                >
                  Accept
                </Button>
              </div>
            </PendingRequest>
          ))}
        </Container>
      </RequestedProjectsContainer>
    </>
  );
}

export const ProjectContainer = styled.div`
  height: 230px;
  overflow-y: scroll;
  border-bottom: 1px solid #ccc;
`;

export const Project = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 9px;
  margin: 5px 0;
  border-radius: 17px;
  border: 1px solid #ccc;
`;

export const DashboardContainer = styled.div`
  display: grid;
  margin-top: 2.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem 1rem;

  @media only screen and (max-width: 650px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (max-width: 470px) {
    display: flex;
    flex-wrap: no-wrap;
  }
  @media only screen and (max-width: 310px) {
    flex-direction: column;
  }
`;

export const DashboardCard = styled.div`
  border-radius: 13px;
  background-color: white;
  height: 200px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
`;

const RequestedProjectsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 0rem 0rem 2.5rem 0rem;
  margin-top: 2.5rem;
  border-radius: 17px;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
`;
const Container = styled.div`
  max-height: 350px;
  overflow-y: scroll;

  &.pending__container::-webkit-scrollbar {
    height: 1px;
    width: 1px;
  }
  &.pending__container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  &.pending__container::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }
`;

const PendingRequest = styled.div`
  border-bottom: 1px solid #ccc;
  border-left: none;
  border-right: none;
  padding: 13px 9px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { Title, Amount } from './Profile';
import {
  DashboardContainer,
  DashboardCard,
  Project,
  ProjectContainer,
} from './ClientDashboard';
import { api } from '../constants';
import Backdrop from '../components/Backdrop.component';
import Modal from '../components/Modal.component.jsx';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.component';

export default function Dashboard() {
  const [clientDetails, setClientDetails] = useState(null);
  const [completedData, setCompletedData] = useState(null);
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { token } = useSelector((state) => state.userToken);
  const { user } = useSelector((state) => state.userDetails);

  const [updated, setUpdated] = useState(false);
  const { dashboardDetails: details } = useSelector(
    (state) => state.userDashboardDetails
  );
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

  const acceptOffer = async () => {
    try {
      const res = await axios.patch(
        `${api}/api/projects/${clientDetails.id}`,
        {
          accepted: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(`You have accepted ${clientDetails.name} request`);
        setUpdated(!updated);
        setShow(false);
      }
    } catch (err) {
      console.log(err.message, err.response.data.message);
    }
  };

  const clientConfirmed = async () => {
    console.log(completedData);

    if (completedData.alreadyCompleted) {
      return;
    }
    try {
      const res = await axios.patch(
        `${api}/api/projects/${completedData.id}`,
        {
          completedByDeveloper: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(`Request has been sent to "${completedData.name}".`);
        setUpdated(!updated);
        setShowConfirmation(false);
      }
    } catch (err) {
      console.log(err.message, err.response.data.message);
    }
  };

  if (!user) return <Redirect to="/" />;
  if (!details) return <Loader />;

  return (
    <>
      {show && <Backdrop setShow={setShow} />}
      {show && (
        <Modal open={show}>
          <DetailsContainer>
            <ModalUser>By: {clientDetails.name}</ModalUser>
            <ModalTitle>Title: {clientDetails.title}</ModalTitle>
            <ModalDescription>
              Description: {clientDetails.description}
            </ModalDescription>
            <Button onClick={acceptOffer}>Aceept client request</Button>
          </DetailsContainer>
        </Modal>
      )}
      {showConfirmation && <Backdrop setShow={setShowConfirmation} />}
      {showConfirmation && (
        <Modal open={showConfirmation}>
          <ModalDescription>
            It means you have completed this project and handed over to the
            client personally. To consider it complete as per this app, client
            has to accept the project.
          </ModalDescription>
          <Button
            onClick={clientConfirmed}
            style={{ margin: '0 auto', fontWeight: 'normal' }}
          >
            Send request
          </Button>
        </Modal>
      )}
      <DashboardContainer>
        <DashboardCard>
          <Title>Total Projects</Title>
          <Amount>{details.total}</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Completed</Title>
          <Amount>{details.completed}</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Working on</Title>
          <Amount>{details.pending}</Amount>
        </DashboardCard>
      </DashboardContainer>

      <ProjectsContainer>
        <ProjectCard>
          <Heading color="blue">Pending projects</Heading>
          <Divider style={{ marginBottom: '0px' }} />
          <ProjectContainer style={{ padding: '0.3rem' }}>
            {details.pendingProjects.length === 0 && (
              <ModalDescription>No pending projects yet</ModalDescription>
            )}
            {details.pendingProjects.map((p) => (
              <Project
                key={p._id}
                style={{ borderRadius: '3px', padding: '0.5rem 0.5rem' }}
              >
                <div>
                  <ModalTitle style={{ marginBottom: 0 }}>
                    "{p.title}" by:{' '}
                  </ModalTitle>

                  <ModalDescription style={{ marginBottom: 0 }}>
                    {p.clientId.username}
                  </ModalDescription>
                </div>
                <Button
                  style={{
                    backgroundColor: p.completedByDeveloper && 'grey',
                    color: p.completedByDeveloper && 'white',
                  }}
                  onClick={() => {
                    setCompletedData({
                      id: p._id,
                      alreadyCompleted: p.completedByDeveloper,
                      name: p.clientId.username,
                    });
                    setShowConfirmation(true);
                  }}
                  disabled={p.completedByDeveloper}
                >
                  {p.completedByDeveloper ? 'Request sent' : 'Completed'}
                </Button>
              </Project>
            ))}
          </ProjectContainer>
        </ProjectCard>
        <ProjectCard>
          <Heading color="green">Completed projects</Heading>
          <Divider style={{ marginBottom: '0px' }} />
          <ProjectContainer style={{ padding: '0.3rem' }}>
            {details.completedProjects.length === 0 && (
              <ModalDescription>No completed projects yet</ModalDescription>
            )}
            {details.completedProjects.map((p) => (
              <Project
                style={{ borderRadius: '3px', padding: '0.5rem 0.5rem' }}
                key={p._id}
              >
                <ModalTitle style={{ marginBottom: 0 }}>
                  "{p.title}" by:{' '}
                </ModalTitle>

                <ModalDescription style={{ marginBottom: 0 }}>
                  {p.clientId.username}
                </ModalDescription>
              </Project>
            ))}
          </ProjectContainer>
        </ProjectCard>
      </ProjectsContainer>
      <RequestsContainer>
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#12609e',
          }}
        >
          All Requests
        </div>
        <Divider />
        {details.pendingRequests.length === 0 && (
          <ModalDescription>No pending requests</ModalDescription>
        )}
        {details.pendingRequests.map((p) => (
          <div key={p._id}>
            <Request>
              <div>Request by: {p.clientId.username}</div>
              <RightItems>
                <div>{p.clientId.title}</div>
                <Button
                  onClick={() => {
                    setClientDetails({
                      name: p.clientId.username,
                      title: p.title,
                      description: p.description,
                      id: p._id,
                    });

                    setShow(true);
                  }}
                >
                  Click here
                </Button>
              </RightItems>
            </Request>
            <Divider />
          </div>
        ))}
      </RequestsContainer>
    </>
  );
}

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 1rem 0;
  background-color: #ccc;
`;

export const Heading = styled.div`
  font-size: 1.2rem;
  margin-top: 5px;
  color: ${(props) => props.color};
  text-align: center;
`;
export const ProjectsContainer = styled.div`
  display: grid;
  margin-top: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem 1rem;

  @media only screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-gap: 1.5rem;
  }
  & ::-webkit-scrollbar {
    height: 6px;
    width: 2px;
  }
`;

export const ProjectCard = styled.div`
  border: 1px solid #ccc;
  height: 300px;
  /* overflow-x: scroll; */
  border-radius: 13px;
`;
const RequestsContainer = styled.div`
  display: flex;
  margin-top: 2.5rem;
  flex-direction: column;
  border-radius: 13px;
  border: 1px solid #ccc;
  padding: 2.1rem 0;
`;
const Request = styled.div`
  display: flex;
  padding: 0 0.8rem;
  justify-content: space-between;
  align-items: center;
`;

const RightItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  color: white;
  text-transform: uppercase;
  border-radius: 25px;
  border: none;
  display: block;
  padding: 9px 1.5rem;
  background-color: #12609e;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 15px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 600px;
  margin-bottom: 0.7rem;
  color: black;
  text-align: center;
`;
export const ModalDescription = styled.div`
  font-size: 0.9rem;
  color: #808080;
  text-align: center;
  margin-bottom: 1.1rem;
`;
const ModalUser = styled.div`
  font-size: 1.2rem;
  letter-spacing: 0.3px;
  padding: 0.3rem 0;
  margin-bottom: 1rem;
  color: #12609e;
  font-weight: bold;
  text-align: center;
`;

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Title, Amount } from './Profile';
import { DashboardContainer, DashboardCard } from './ClientDashboard';

export default function Dashboard() {
  //   const token = useSelector((state) => state.userToken);
  //   const { user } = useSelector((state) => state.userDetails);

  //   console.log(token);
  return (
    <>
      <DashboardContainer>
        <DashboardCard>
          <Title>Total Projects</Title>
          <Amount>20</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Completed</Title>
          <Amount>19</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Working on</Title>
          <Amount>1</Amount>
        </DashboardCard>
      </DashboardContainer>

      <ProjectsContainer>
        <ProjectCard>
          <Heading color="green">Completed projects</Heading>
          <Divider />
          No projects yet
        </ProjectCard>
        <ProjectCard>
          <Heading color="blue">Pending projects</Heading>
          <Divider />
          No projects yet
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
        <Request>
          <div>Client 1</div>
          <RightItems>
            <div>Project 1</div>
            <Button>Click here</Button>
          </RightItems>
        </Request>
        <Divider />
        <Request>
          <div>Client 2</div>
          <RightItems>
            <div>Project 2</div>
            <Button>Click here</Button>
          </RightItems>
        </Request>
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem 1rem;
  & ::-webkit-scrollbar {
    height: 6px;
    width: 2px;
  }
`;

export const ProjectCard = styled.div`
  border: 1px solid #ccc;
  min-height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
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

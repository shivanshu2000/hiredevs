import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { Title, Amount } from './Profile';
import {
  ProjectsContainer,
  ProjectCard,
  Heading,
  Divider,
} from './DeveloperDashboard';

export default function Dashboard() {
  const token = useSelector((state) => state.userToken);
  const { user } = useSelector((state) => state.userDetails);

  if (!user) return <Redirect to="/" />;
  console.log(token);
  return (
    <>
      <DashboardContainer>
        <DashboardCard>
          <Title>Total requested</Title>
          <Amount>{user.total}</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Completed</Title>
          <Amount>{user.completed}</Amount>
        </DashboardCard>
        <DashboardCard>
          <Title>Remaining</Title>
          <Amount>{user.total * 1 - user.completed * 1}</Amount>
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
    </>
  );
}

export const DashboardContainer = styled.div`
  display: grid;
  margin-top: 2.5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem 1rem;
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
`;

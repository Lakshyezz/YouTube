import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components'

const Container = styled.div`
    width: 300px;
    margin-bottom: 45px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 100%;
    height: 202px;
  background-color: #999;
    cursor: pointer;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px ;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div``; // Container for texts
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
  `;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({theme}) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div``;
const Card = () => {
  return (
    <Link to= "/video/test" style={{textDecoration: "none"}}>

    <Container>
      <Image src='https://imgs.search.brave.com/uk34_XAExovW2H3nfa1-2NGrJ-pzQatMbr67I06PpqA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzgxLzgzLzAz/LzM2MF9GXzgxODMw/MzMwX3NmczQ2eVJE/VjFYVU9BQUFVVWpU/Z0N1N08xNG5RaW84/LmpwZw'/>
      <Details>
        <ChannelImage/>
        <Texts>
          <Title>Test Video</Title>
          <ChannelName>Logan</ChannelName>
          <Info>660,988 views • 1 day ago</Info>
        </Texts>
      </Details>
    </Container>
    </Link>
  )
}

export default Card
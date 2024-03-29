import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
// import Comments from "../components/Comments";
import Card from "../components/Card";
import { useSelector, useDispatch } from 'react-redux';
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const {currentUser} = useSelector(state => state.user)
  const {currentVideo} = useSelector(state => state.video)
  const dispatch = useDispatch()
  axios.defaults.withCredentials = true;

  const path = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState({});

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const videoRes = await axios.get(`http://localhost:8800/api/videos/find/${path}`
        ,{withCredentials: true});
      
        console.log("videoRes.data => " + JSON.stringify(videoRes.data._id));
        
        const channelRes = await axios.get(`http://localhost:8800/api/users/find/${videoRes.data.userId}`)
        // console.log("channel => " + JSON.stringify(channelRes));
        
        setChannel(channelRes.data);
        console.log("channel => " + JSON.stringify(channel));
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.log("error => " + error);
      }
    }
    fetchData();
  },[path,dispatch]);

  const handleLike = async() => {
    // console.log("currentVideo._id => " + currentVideo._id);
    await axios.put(`http://localhost:8800/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id))
  }
  const handleDislike = async() => {
    // axios.defaults.withCredentials = true;
    await axios.put(`http://localhost:8800/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id))
  }
  const handleSub  = async() => {
    console.log("channel._id => " + JSON.stringify(channel._id));
    currentUser.subscribedUsers.includes(channel._id) ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`)
    : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id))
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src = {currentVideo.videoUrl}/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} • Jun 22, 2022</Info>
          <Buttons>
            <Button onClick={handleLike}>
             {currentVideo.likes?.includes(currentUser._id) ? 
              <ThumbUpIcon/>
             : <ThumbUpOutlinedIcon />} {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id) ?
             <ThumbDownIcon/> : <ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <Description>
              {currentVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe
            onClick={handleSub}
          >{currentUser.subscribedUsers?.includes(channel._id)
          ? "SUBSCRIBED" :
           "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
      </Content>
      {/* <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation> */}
    </Container>
  );
};

export default Video;
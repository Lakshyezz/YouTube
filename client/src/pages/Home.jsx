import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import axios from 'axios';

  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  
  `;

const Home = ({ type }) => {

  const [videos, setVideos] = useState([]);
  const {currentUser} = useSelector(state => state.user)

  useEffect(()=>{
    const fetchVideos = async() => {
      const res = await axios.get(`http://localhost:8800/api/videos/${type}`,{withCredentials: true});
      if(type === 'sub') console.log("video => " + JSON.stringify(videos));
      setVideos(res.data);
    }
    fetchVideos();
  }, [type]);

  return (
    <Container>
     {videos.map((video,count) => (
      <Card key={video._id} video = {video}/>
     ))}
     
    </Container>
  )
}

export default Home;
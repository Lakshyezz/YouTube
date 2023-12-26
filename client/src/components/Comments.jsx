import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {

const {currentUser} = useSelector(state => state.user)  
const [comments, setComments] = useState([]);

useEffect(()=>{
    const fetchComments = async() => {
      try {
          const res = await axios.get(`http://localhost:8800/api/comments/${videoId}`);
          console.log("comments => " + res);
          setComments(res.data)

      } catch (error) {
        console.log("Error in useEffect of fetchComments " + error);
      }
    };
    fetchComments();
},[videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src = {currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map(item =>  ( <Comment key={item._id} comment = {item}/> )
      )}
      {/* <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/> */}
    </Container>
  );
};

export default Comments;
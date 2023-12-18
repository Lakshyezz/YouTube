import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { logout } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0 ;
  background-color: $(({theme})=> theme.bgLighter);
  height: 50px;
`;

const Wrapper = styled.div`
  display:flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc; 
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
background-color: transparent;
`;

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color:  #3ea6ff;
border-radius: 4px;
font-weight: 500;
cursor: pointer;
align-items: center;
display:flex;
gap: 8px;
`;

const User = styled.div`
align-items: center;
display:flex;
gap: 10px;
font-weight: 500;
color: $(({theme})=> theme.text );
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color:  #999;
`;
const ProfileMenu = styled.div`
margin-right: 10px;
  height: 100%;
  width: 90px;
  border:  0.5px  solid grey;
  position: absolute;
  top: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
`
const Navbar = () => {

  const {currentUser} = useSelector(state => state.user)
  const [menuOn , setMenuOn] = useState(false);
  const dispatch = useDispatch()
  // dispatch(logout())
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search"/>
          <SearchOutlinedIcon/>
        </Search>
        {currentUser ?
          <User>
            <VideoCallOutlinedIcon/>
            <Avatar
            src={currentUser.img}
             onClick={()=> setMenuOn(!menuOn)}/>
            {currentUser.name}
          </User> : <Link to="signin" style={{textDecoration: "none"}}>
        <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
        </Link>}
      
      </Wrapper>
      {
           menuOn ? <ProfileMenu>
           <Button onClick={()=> {
            dispatch(logout());
            setMenuOn(!menuOn)
           }}>Log Out</Button>
          </ProfileMenu>: <></>
        }
    </Container>
    
  )
}

export default Navbar


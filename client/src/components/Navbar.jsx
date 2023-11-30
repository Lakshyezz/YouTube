import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'

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
const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search"/>
          <SearchOutlinedIcon/>
        </Search>
        <Link to="signin" style={{textDecoration: "none"}}>
        <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Navbar
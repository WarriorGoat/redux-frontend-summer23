import { Box, Container, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "../redux/authSlice";

const Home = () => {
  const dispatch=useDispatch()
  const auth = useSelector(state => state.auth.isAuth)
  const users = useSelector (state => state.users)

  useEffect(() => {
    dispatch(authCheck())
  }, [auth])

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h3">
            {auth ? <>Welcome {users.firstname}</> : <>Please Sign In</>}
          </Typography>
        </Box>
        <Button variant="contained" href="/signin">Sign In</Button>
        <Button variant="contained" href="/register">Register</Button>
      </Container>
    </>
  );
};

export default Home;

import { Box, Container, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authCheck, logout } from "../redux/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(authCheck());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h3">
            {auth ? <>Welcome {users.firstname}</> : <>Please Sign In</>}
          </Typography>
        </Box>
        {auth ? (
          <Button variant="contained" onClick={() => dispatch(logout())}>
            {" "}
            Sign out
          </Button>
        ) : (
          <>
            <Button variant="contained" href="/signin">
              Sign In
            </Button>
            <Button variant="contained" href="/register">
              Register
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;

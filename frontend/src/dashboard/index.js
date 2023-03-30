import React, { useEffect } from "react";
import { Container, Link, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchUsers } from "../redux/slices/app";
const DashboardLayout = () => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(FetchUsers())
  },[])
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Stack spacing={5}>
        <Stack direction={"row"} spacing={0.5}>
          {/* <Typography variant="body2">Want to see</Typography>
          <Link component={RouterLink} to="/create" variant="subtitle2">
            Start Adding users
          </Link> */}
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
};

export default DashboardLayout;

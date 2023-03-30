import React from "react";
import CreateUser from "./CreateUser";
import { Container, Stack } from "@mui/material";

const Dashboard = () => {
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Stack spacing={5}>
        <CreateUser />
      </Stack>
    </Container>
  );
};

export default Dashboard;

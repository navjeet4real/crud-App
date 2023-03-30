import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Stack,
  Typography,
  Link,
  Alert,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../components";
import FormProvider from "../components";
import { Link as RouterLink } from "react-router-dom";
import { CreateUserFunc } from "../redux/slices/app";

const CreateUser = () => {
  const dispatch = useDispatch();

  const UserSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid email address"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
  });
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "dawg@gmail.com",
    mobileNumber: "+91 99911 11911",
  };
  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log("data................", data);
      dispatch(
        CreateUserFunc({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobileNumber: data.mobileNumber,
        })
      );
    } catch (error) {
      console.error(error, "******error*******");
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get Started with CRUD App</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Want to see</Typography>
          <Link component={RouterLink} to="/users" variant="subtitle2">
            All Users
          </Link>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">First Name</InputLabel>
              <RHFTextField
                name="firstName"
                className="input_field"
                placeholder="e.g. John"
              />
            </div>
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">Last Name</InputLabel>
              <RHFTextField
                name="lastName"
                className="input_field"
                placeholder="e.g. Smith"
              />
            </div>
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">Email</InputLabel>
              <RHFTextField
                name="email"
                className="input_field"
                placeholder="e.g. john@smith.com"
              />
            </div>
            {/* {role == "agent" && ( */}
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">Mobile Number</InputLabel>
              <RHFTextField
                name="mobileNumber"
                className="input_field"
                placeholder="e.g. 0400 000 000"
              />
            </div>
            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
            >
              Create User
            </Button>
          </Stack>
        </FormProvider>
        {/* <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
            textAlign: "center",
          }}
        >
          {" By signing up, I agree to "}
          <Link to="" underline="always" color={"text.primary"}>
            Terms of service
          </Link>
          {" and "}
          <Link to="" underline="always" color={"text.primary"}>
            Privacy Policy
          </Link>
        </Typography> */}
      </Stack>
    </>
  );
};

export default CreateUser;

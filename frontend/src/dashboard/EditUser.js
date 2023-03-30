import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Stack,
  Typography,
  Link,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { RHFTextField } from "../components";
import FormProvider from "../components";
import { Link as RouterLink } from "react-router-dom";
import { EditUserFunc, GetUser } from "../redux/slices/app";

const EditUser = () => {
  const { userDetails } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  console.log(userDetails, ":userDetails");

  const EditUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
  });

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues: {
      id: userDetails?._id || "",
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      email: userDetails?.email || "",
      mobileNumber: userDetails?.mobileNumber || "",
    },
  });

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(
        EditUserFunc({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobileNumber: data.mobileNumber,
        })
      );
      dispatch(GetUser(userDetails._id));
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
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">First Name</InputLabel>
              <RHFTextField
                name="firstName"
                control={control}
                label="First name"
                className="input_field"
                placeholder="e.g. John"
              />
            </div>
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">Last Name</InputLabel>
              <RHFTextField
                name="lastName"
                control={control}
                label="Last name"
                className="input_field"
                placeholder="e.g. Smith"
              />
            </div>
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">Email</InputLabel>
              <RHFTextField
                label="Email"
                name="email"
                control={control}
                className="input_field"
                placeholder="e.g. john@smith.com"
              />
            </div>
            {/* {role == "agent" && ( */}
            <div className="form-group AdminLogForm">
              <InputLabel className="form-label">Mobile Number</InputLabel>
              <RHFTextField
                name="mobileNumber"
                control={control}
                label="Mobile"
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
              Edit User
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </>
  );
};

export default EditUser;

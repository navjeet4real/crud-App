import { Stack, Typography, Link, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import { FetchUsers, GetUser } from "../redux/slices/app";

const AllUsers = () => {
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  console.log(userList, "userlist");
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">List of users: </Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Create one</Typography>
          <Link component={RouterLink} to="/create" variant="subtitle2">
            User
          </Link>
        </Stack>
        <Stack spacing={1}>
          {userList.length > 0 ? <>
            <div className="table-responsive">
            <div className="table listing_table">
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userList.map((item, index) => {
                      return <UserList {...item} key={index} />;
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
          </> : "You haven't created any user Yet."}
        </Stack>
      </Stack>
    </>
  );
};

export default AllUsers;

const UserList = ({ firstName, lastName, email, mobileNumber, _id }) => {
  const dispatch = useDispatch();
  let fullName = firstName + " " + lastName;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleDeleteCloseDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleEditCloseDialog = () => {
    setOpenEditDialog(false);
  };
  const handleDeleteOpenDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleEditOpenDialog = () => {
    setOpenEditDialog(true);
  };
  return (
    <>
      <tr>
        <td>{fullName}</td>
        <td>{email}</td>
        <td>{mobileNumber}</td>
        <td className="action_td">
          <Stack direction={"row"} spacing={3}>
            <Button
             onClick={() => {
              handleEditOpenDialog();
              dispatch(GetUser(_id))
            }}
            >Edit</Button>
            <Button
              onClick={() => {
                handleDeleteOpenDialog();
              }}
            >
              Delete
            </Button>
          </Stack>
        </td>
      </tr>
      <DeleteModal _id={_id} fullName={fullName} open={openDeleteDialog} handleClose={handleDeleteCloseDialog} />
      <EditModal _id={_id} fullName={fullName} open={openEditDialog} handleClose={handleEditCloseDialog} />

    </>
  );
};

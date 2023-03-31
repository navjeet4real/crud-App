import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  userList: null,
  userDetails: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.userList = action.payload.users;
    },
    getUserDetails(state, action) {
      state.userDetails = action.payload.userDoc;
    },
  },
});

export default slice.reducer;

export const ShowSnackBar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };

export const CloseSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export function CreateUserFunc(formValues) {
  console.log(formValues, "form values");
  return async (dispatch, getState) => {
    await axios
      .post(
        "/user/create",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        dispatch(
          ShowSnackBar({
            severity: "success",
            message: "User Created successfully!",
          })
        );
        if (response.status === 200) {
          window.location.href = "/users";
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(ShowSnackBar({ severity: "error", message: error.message }));
      });
  };
}
export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function DeleteUserFunc(id) {
  return async (dispatch, getState) => {
    await axios
      .delete(`/user/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response, "response");
        dispatch(
          ShowSnackBar({ severity: "success", message: response.data.message })
        );
        dispatch(FetchUsers());
      })
      .catch((err) => {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }));
      });
  };
}
export function GetUser(id) {
  console.log(id, "formValues");
  return async (dispatch, getState) => {
    await axios
      .get(`/user/get_user/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response, "response");
        dispatch(slice.actions.getUserDetails({ userDoc: response.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function EditUserFunc(formValues, files) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/user/edit",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response, "response");
        dispatch(
          ShowSnackBar({ severity: "success", message: response.data.message })
        );
        dispatch(GetUser(response.data.id));
      })
      .catch(function (err) {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }));
      });
  };
}

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminLoginSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    token:null,
  },
  reducers:{
    loginAdminStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginAdminSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.error = null;
    },
    loginAdminFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutAdmin: (state) => {
      state.token = null;
    },
  }
});
export const loginAdmin = (data) => async (dispatch) => {
  try {
    dispatch(adminLoginSlice.actions.loginAdminStart());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/login`,
      data,
      { withCredentials: true },
    );

    dispatch(adminLoginSlice.actions.loginAdminSuccess(res.data));
    return res.data
  } catch (error) {
    dispatch(
      adminLoginSlice.actions.loginAdminFail(
        error?.response?.data?.message || "Add Plans failed",
      ),
    );
  }
};
export default adminLoginSlice.reducer;
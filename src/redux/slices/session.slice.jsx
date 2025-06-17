import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  user_name: "",
  user_email: "",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearSession: () => initialState,
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;

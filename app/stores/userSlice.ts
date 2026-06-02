import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  name: string;
}

const initialState: UserState = {
  email: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.email = "";
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

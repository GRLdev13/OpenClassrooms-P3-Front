import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  name: string;
  token:string;
}

const initialState: UserState = {
  email: "",
  name: "",
  token:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; name: string; token:string }>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.email = "";
      state.name = "";
      state.token = "";
    },
    getState: (state) =>
    {
      return state;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

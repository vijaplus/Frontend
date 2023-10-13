import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  setUserInfo: null,
};

export const userSlice = createSlice({
  name:"setUserInfo",
  initialState,
  reducers:{
    setUserInfo: (state, action) => {
      state.setUserInfo = action.payload
    }
  }
})

export const {setUserInfo} = userSlice.actions
export default userSlice.reducer

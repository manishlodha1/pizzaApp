import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from  "../../services/apiGeocoding";

const USER_FETCH_ADDRESS = "user/fetchAddress";


function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(USER_FETCH_ADDRESS, async()=> 
{
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address }; // Payload of the fullfilled state
});

const initialState = { username : "", status : "idle", position: {}, address : "", error: "" };

const userSlice = createSlice(
{
  name: "user",
  initialState, 
  reducers:
  {
    updateName(state, action)
    {
      state.username = action.payload;
    }
  }, 
  extraReducers:(builder)=>
  {
    builder.addCase(fetchAddress.pending, (state, action)=> 
    {
      state.status = 'loading';
    })
    .addCase(fetchAddress.fulfilled, (state, action)=> 
    {
      state.status = 'idle';
      state.address = action.payload.address;
      state.position = action.payload.position;
    })
    .addCase(fetchAddress.rejected, (state, action)=> 
    {
      state.status = 'error';
      //state.error = action.error.message;
      state.error = "There was a problem getting your address. Make sure to fill this field!";
    });
  }
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (store)=> store.user.username;

export const getUserState = (store)=> store.user
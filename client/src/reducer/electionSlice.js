import { createSlice } from "@reduxjs/toolkit";

export const electionSlice = createSlice({
    name: "electionSlice",
    initialState: {
        doners:[],
        allRegisteredCanidates:[],
        allRegisteredVoters:[],
        isRegistredVoter:""
    },
    reducers: {
        setDoners: (state, action) => {
            // console.log("action.payload")
            state.doners = action.payload;
        },
        setAllRegisteredCanidates: (state, action) => {
            state.allRegisteredCanidates = action.payload;
        },
        setAllRegisteredVoters: (state, action) => {
            state.allRegisteredVoters = action.payload;
        },
        setIsRegistredVoter: (state, action) => {
            state.isRegistredVoter = action.payload;
        }
    },
});

export const { setDoners,setAllRegisteredCanidates,setAllRegisteredVoters,setIsRegistredVoter } = electionSlice.actions;
export default electionSlice.reducer;
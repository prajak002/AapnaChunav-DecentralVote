import { createSlice } from "@reduxjs/toolkit";

export const checkSlice = createSlice({
    name: "checkSlice",
    initialState: { 
        verify:false,
        addCandidate:false,
        voting:false,
        funds:false,
        result:false,
        registers:false,
        home:false,
    },
    reducers: {
        setVerify: (state, action) => {
            state.verify = action.payload;
        },
        setAddCandidate: (state, action) => {
            state.addCandidate = action.payload;
        },
        setVoting: (state, action) => {
            state.voting = action.payload;
        },
        setFunds: (state, action) => {
            state.funds = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        setRegisters: (state, action) => {
            state.registers = action.payload;
        },
        setHome: (state, action) => {
            state.home = action.payload;
        },
    }
});

export const { setVerify,setAddCandidate,setVoting,setFunds,setResult,setRegisters,setHome} = checkSlice.actions;
export default checkSlice.reducer;
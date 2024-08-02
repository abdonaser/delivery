import { createSlice } from "@reduxjs/toolkit";

const activeWelcomeName = createSlice({
    name: "activeName",

    initialState: { activeName: "false" },

    reducers: {
        changeActive: (state, action) => {
            state.activeName = action.payload
        }

    }

})

export const { changeActive } = activeWelcomeName.actions
export default activeWelcomeName.reducer //' export the inetialstate of count { counter: 0 }
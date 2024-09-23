import { createSlice } from '@reduxjs/toolkit';

const interviewSlice = createSlice({
  name: 'interviews',
  initialState: {
    scheduledInterviews: [],
  },
  reducers: {
    scheduleInterview: (state, action) => {
      state.scheduledInterviews.push(action.payload);
    },
  },
});

export const { scheduleInterview } = interviewSlice.actions;
export default interviewSlice.reducer;

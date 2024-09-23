import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { scheduleInterview } from '../store/slices/interviewSlice';

const InterviewScheduler = ({ candidateName }) => {
  const dispatch = useDispatch();
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewDetails, setInterviewDetails] = useState('');

  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!candidateName || !interviewDate || !interviewTime) {
      toast.error('Please fill in all fields');
      return;
    }

    const interviewData = {
      candidateName,
      interviewDate,
      interviewTime,
      interviewDetails,
    };

    dispatch(scheduleInterview(interviewData));
    toast.success('Interview scheduled successfully!');
    resetForm();
  };

  const resetForm = () => {
    setInterviewDate('');
    setInterviewTime('');
    setInterviewDetails('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedule an Interview</h2>
      <form onSubmit={handleScheduleInterview}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Candidate Name:</label>
          <input
            type="text"
            value={candidateName}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Interview Date:</label>
          <input
            type="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Interview Time:</label>
          <input
            type="time"
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Details:</label>
          <textarea
            value={interviewDetails}
            onChange={(e) => setInterviewDetails(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default InterviewScheduler;

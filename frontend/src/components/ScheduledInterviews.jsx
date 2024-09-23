import React from 'react';
import { useSelector } from 'react-redux';

const ScheduledInterviews = () => {
  const { scheduledInterviews } = useSelector((state) => state.interviews);

  return (
    <div>
      <h2>Scheduled Interviews</h2>
      <ul>
        {scheduledInterviews.map((interview, index) => (
          <li key={index}>
            {interview.candidateName} - {interview.interviewDate} at {interview.interviewTime}
            <p>{interview.interviewDetails}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledInterviews;

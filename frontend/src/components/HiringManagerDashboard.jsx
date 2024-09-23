import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyJobs, clearAllJobErrors } from "../store/slices/jobSlice"; // Adjust the import based on your actual slice file

export default function HiringManagerDashboard() {
  const dispatch = useDispatch();
  const { loading, error, myJobs, message } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (error) {
      // Handle error (e.g., show a toast notification)
      dispatch(clearAllJobErrors());
    }
    if (message) {
      // Handle success message (e.g., show a toast notification)
    }
    dispatch(getMyJobs()); // Fetch the jobs when the component mounts
  }, [dispatch, error, message]);

  const totalApplicants = myJobs ? myJobs.reduce((acc, job) => acc + job.applicants.length, 0) : 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            <span className="sr-only">TechCo Hiring</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <span className="sr-only">Dashboard</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <span className="sr-only">Jobs</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <span className="sr-only">Candidates</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <span className="sr-only">Interviews</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground">
            <span className="sr-only">Analytics</span>
          </div>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4">
          <div className="relative ml-auto flex-1">
            <input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8" />
          </div>
          <div className="flex items-center">
            <span className="sr-only">My Account</span>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <div className="card sm:col-span-2">
                <h2>Job Openings</h2>
                <p>Manage your open positions and track applicant progress with our comprehensive hiring dashboard.</p>
                <button>Create New Job</button>
              </div>
              <div className="card">
                <h3>Open Positions</h3>
                <h4 className="text-4xl">{myJobs ? myJobs.length : 0}</h4>
                <p className="text-xs text-muted-foreground">+{myJobs ? myJobs.length - 3 : 0} from last month</p>
              </div>
              <div className="card">
                <h3>Total Applicants</h3>
                <h4 className="text-4xl">{totalApplicants}</h4>
                <p className="text-xs text-muted-foreground">+52 from last week</p>
              </div>
            </div>
            <div>
              <h3>Open Positions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Posted Date</th>
                    <th>Applicants</th>
                  </tr>
                </thead>
                <tbody>
                  {myJobs && myJobs.map((job) => (
                    <tr key={job._id}>
                      <td>{job.title}</td>
                      <td>{job.department}</td>
                      <td>{job.status}</td>
                      <td>{new Date(job.postedDate).toLocaleDateString()}</td>
                      <td>{job.applicants.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card">
              <h2>Job Details</h2>
              {myJobs && myJobs.length > 0 ? (
                <>
                  <p>Job ID: {myJobs[0]._id}</p>
                  <p>Posted: {new Date(myJobs[0].postedDate).toLocaleDateString()}</p>
                  <h3>Job Description</h3>
                  <p>{myJobs[0].description}</p>
                  <h3>Key Requirements</h3>
                  <ul>
                    {myJobs[0].requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  <h3>Hiring Team</h3>
                  <p>Hiring Manager: {myJobs[0].hiringManager}</p>
                  <p>Recruiter: {myJobs[0].recruiter}</p>
                </>
              ) : (
                <p>No job details available.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

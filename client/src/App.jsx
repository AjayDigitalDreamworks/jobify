import { useEffect, useState } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    checkBackend();
    fetchJobs();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await fetch(`${apiUrl}/health`);
      if (res.ok) {
        setBackendStatus('Backend connected');
      } else {
        setBackendStatus('Backend not connected');
      }
    } catch (error) {
      setBackendStatus('Backend not connected');
      console.error('Backend error:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${apiUrl}/jobs`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '40px' }}>
      <h1>Jobify</h1>
      <p>Find Your Dream Job</p>

      <div className="status-box" style={{ marginTop: '30px' }}>
        <h2>System Status</h2>
        <p>Backend: {backendStatus}</p>
        <p>API URL: {apiUrl}</p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Jobs</h2>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs available yet</p>
        ) : (
          <ul>
            {jobs.map((job, idx) => (
              <li key={idx}>{job}</li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={fetchJobs} style={{ marginTop: '20px' }}>
        Refresh Jobs
      </button>
    </main>
  );
}

export default App;

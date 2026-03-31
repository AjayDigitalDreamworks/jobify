import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBackend();
    fetchJobs();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
      if (res.ok) {
        const data = await res.json();
        setBackendStatus('✅ Backend connected');
      }
    } catch (error) {
      setBackendStatus('❌ Backend not connected');
      console.error('Backend error:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Jobify - Find Your Dream Job</title>
        <meta name="description" content="Job portal application" />
      </Head>

      <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1>🚀 Jobify</h1>
        <p>Find Your Dream Job</p>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h2>System Status</h2>
          <p>Backend: {backendStatus}</p>
          <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
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

        <button onClick={fetchJobs} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Refresh Jobs
        </button>
      </main>
    </>
  );
}

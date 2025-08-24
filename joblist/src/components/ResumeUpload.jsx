import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ResumeUpload() {
  const { token } = useAuth();  // assumes your context returns { token, ... }
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setStatus('Please select a PDF file.');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setStatus('File too large (max 5MB).');
      return;
    }
    setStatus('');
    setFile(f);
  }

  async function onUpload() {
    if (!file) return setStatus('Choose a PDF first.');
    try {
      setStatus('Uploading...');
      const form = new FormData();
      form.append('resume', file); // field name must match backend upload.single('resume')

      const res = await fetch(`${import.meta.env.VITE_API_URL}/uploads/resume`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }, // no Content-Type on purpose (browser sets multipart)
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Upload failed (${res.status})`);
      }

      const { url } = await res.json();
      setResumeUrl(url);
      setStatus('Uploaded ✔');
    } catch (e) {
      setStatus(e.message);
    }
  }

  return (
    <div className="p-4 border rounded-xl max-w-md">
      <label className="block font-medium mb-2">Upload your resume (PDF only)</label>
      <input type="file" accept="application/pdf" onChange={onFileChange} className="mb-3" />
      {file && <p className="text-sm mb-2">Selected: {file.name}</p>}
      <button
        onClick={onUpload}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        disabled={!file}
      >
        Upload Resume
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
      {resumeUrl && (
        <p className="mt-2 text-sm">
          File URL:&nbsp;
          <a className="underline text-blue-700" href={resumeUrl} target="_blank" rel="noreferrer">
            {resumeUrl}
          </a>
        </p>
      )}
    </div>
  );
}

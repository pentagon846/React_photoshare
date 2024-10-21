import React, { useState } from 'react';
import axios from 'axios';

function PhotoUpload({ setPhotos }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);
    formData.append('description', description);

    axios.post('http://127.0.0.1:8000/api/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        setPhotos(prevPhotos => [...prevPhotos, response.data]);
      })
      .catch(error => {
        console.error('Error uploading photo:', error);
      });
  };

  return (
    <div>
      <h2>Upload New Photo</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Photo description" />
        <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default PhotoUpload;

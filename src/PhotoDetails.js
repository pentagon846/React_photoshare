import React, { useState } from 'react';
import axios from 'axios';

function PhotoDetails({ photo, setSelectedPhoto }) {
  const [description, setDescription] = useState(photo.description);

  const handleUpdateDescription = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/photos/${photo.id}/${description}`)
      .then(() => {
        setSelectedPhoto(null);  
      })
      .catch(error => {
        console.error('Error updating description:', error);
      });
  };

  return (
    <div className="photo-details">
      <h2>{photo.title}</h2>
      <img src={photo.url} alt={photo.title} />
      <form onSubmit={handleUpdateDescription}>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Update Description</button>
      </form>
      <button onClick={() => setSelectedPhoto(null)}>Close</button>
    </div>
  );
}

export default PhotoDetails;

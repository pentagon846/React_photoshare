import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoDetails from './PhotoDetails';
import PhotoUpload from './PhotoUpload';
import './components/Gallary/Gallary.css'
function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Отримуємо всі фотографії при завантаженні компонента
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/photos/all')
      .then(response => {
        setPhotos(response.data);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  // Вибір фото для перегляду деталей
  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  // Функція для видалення фото
  const handleDeletePhoto = (photoId) => {
    axios.delete(`http://127.0.0.1:8000/api/photos/${photoId}`)
      .then(() => {
        setPhotos(photos.filter(photo => photo.id !== photoId));
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
      });
  };

  return (
    <div className="gallery-container">
      <h1>Photo Gallery</h1>
      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <img src={photo.url} alt={photo.title} onClick={() => handleSelectPhoto(photo)} />
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Відображення форми для завантаження нових фото */}
      <PhotoUpload setPhotos={setPhotos} />

      {/* Відображення деталей вибраної фотографії */}
      {selectedPhoto && <PhotoDetails photo={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />}
    </div>
  );
}

export default Gallery;

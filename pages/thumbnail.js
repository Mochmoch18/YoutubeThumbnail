import { useState } from 'react';

const ThumbnailDownloader = () => {
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const downloadThumbnail = async () => {
    try {
      const response = await fetch(`/api/thumbnail?url=${url}`);
      const data = await response.json();

      if (response.ok) {
        setThumbnailUrl(data.thumbnailUrl);
      } else {
        alert(data.error || 'Thumbnail not found on this page.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>YouTube Thumbnail Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={downloadThumbnail}>Download Thumbnail</button>
      {thumbnailUrl && (
        <div>
          <h2>Thumbnail Image:</h2>
          <img src={thumbnailUrl} alt="YouTube Thumbnail" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailDownloader;

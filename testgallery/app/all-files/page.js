'use client'
import React, { useEffect, useState } from 'react';

export default function AllFilesPage() {
  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다');
        const data = await response.json();
        setBlobs(data);
      } catch (error) {
        console.error("이미지를 가져오는 중 에러가 발생했습니다!!!!!!!:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div>
        {blobs.map((blob, index) => (
          <div key={index}>
            <h3>{blob.title}</h3>
            <img src={blob.url} alt={blob.title} />
          </div>
        ))}            
      </div>
    </>
  );
}

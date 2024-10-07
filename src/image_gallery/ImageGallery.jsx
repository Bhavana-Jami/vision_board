import React, { useEffect, useRef, useState } from "react";
import "./ImageGallery.css";
import { imageList } from "./imageList";
const ImageGallery = () => {
  const imageRefs = useRef([]);
  const [loadedImages, setLoadedImages] = useState([]);

  const checkIfImageLoaded = (ref, index) => {
    if (ref && ref.current) {
      setLoadedImages((prevState) => {
        const newState = [...prevState];
        newState[index] = ref.current.complete;
        return newState;
      });
    }
  };
  useEffect(() => {
    imageRefs.current.forEach((ref, index) => {
      checkIfImageLoaded(ref, index);
    });
  }, []);
  console.log(loadedImages);
  return (
    <div className="wrapper">
      <div className="header">Create your own vision board</div>
      <div className="image_list">
        {imageList.map((image, index) => (
          <div className="image_container" key={index}>
            {loadedImages ? (
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={image}
                alt={`Image ${index}`}
                loading="lazy"
                onLoad={() =>
                  checkIfImageLoaded(imageRefs.current[index], index)
                }
              />
            ) : (
              <div className="image_overlay">
                <p>The title for every image goes here</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

import React, { useState } from "react";
import Image from "../../../UI-items/Image";

const images = [
  {
    id: 1,
    src: 'https://via.placeholder.com/300x200?text=Image+1',
    alt: 'Image 1',
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/300x200?text=Image+2',
    alt: 'Image 2',
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/300x200?text=Image+3',
    alt: 'Image 3',
  },
  {
    id: 4,
    src: 'https://via.placeholder.com/300x200?text=Image+4',
    alt: 'Image 4',
  }
];

const ProductGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);


  return (
    <div className="flex flex-col items-center gap-5">
      <div className="bg-zinc-200 border-2 w-full flex justify-center rounded-xl">
        <div className="mb-6 py-1 px-6 ">
          <Image
            url={selectedImage.src}
            alt={selectedImage.alt}
            className=" h-80 object-cover rounded-lg shadow-lg "
          />
        </div>
      </div>
      <div className="flex gap-5">
        {images.map((image) => (
          <Image
            key={image.id}
            url={image.src}
            alt={image.alt}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${selectedImage.id === image.id ? 'border-blue-500' : 'border-transparent'
              }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;

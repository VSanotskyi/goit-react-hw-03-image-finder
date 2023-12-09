const ImageGalleryItem = ({ image, toggleModal, getElForModal }) => {
  return (
    <li>
      <img src={image.previewURL}
           alt={image.tags}
           onClick={() => getElForModal(image)}
      />
    </li>
  );
};

export default ImageGalleryItem;

function filterImages(images, fileType) {
  const filteredImages = images.filter(
    (img) => getExtension(img.type) !== fileType
  );
  return filteredImages;
}

function getExtension(img) {
  return img.split('/')[1];
}

export default filterImages;

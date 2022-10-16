function photographerMediaFactory(data, mediaType) {
  if (mediaType === "image") {
    return new ImageModel(data);
  } else if (mediaType === "video") {
    return new VideoModel(data);
  } else {
    throw "Unknown type format";
  }
}

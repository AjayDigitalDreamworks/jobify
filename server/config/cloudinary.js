const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isCloudinaryConfigured = () => (
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
);

const uploadBufferToCloudinary = (buffer, options = {}) => (
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });

    stream.end(buffer);
  })
);

const deleteCloudinaryAsset = (publicId) => {
  if (!publicId) {
    return Promise.resolve();
  }

  return cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
};

module.exports = {
  deleteCloudinaryAsset,
  isCloudinaryConfigured,
  uploadBufferToCloudinary,
};

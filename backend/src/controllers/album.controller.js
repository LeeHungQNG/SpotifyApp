import { ALbum } from '../models/album.model.js';
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await ALbum.find();
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await ALbum.findById(albumId);

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

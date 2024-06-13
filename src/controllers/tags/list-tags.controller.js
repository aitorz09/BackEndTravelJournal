import {listTagsModel} from '../../models/tags/index.js'

export default async function listTagsController(req, res, next) {
  try {

    const { tags } = await listTagsModel()

    return res.status(200).json({
      ok: true,
      tags,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
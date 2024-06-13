import express from 'express';
import {listTagsController} from '../controllers/tags/index.js';
import { listPostsByTagController } from '../controllers/posts/index.js';

const router = express.Router();

/* /tags */
router
    .get("/", listTagsController)
    .get("/:tag/posts",listPostsByTagController)

export default router
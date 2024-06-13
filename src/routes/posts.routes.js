import express from 'express';
import { createMediaPostController, createPostController, deletePostController, listPostController, randomPostsController, showPostController, updatePostController } from '../controllers/posts/index.js';
import checkUser from '../middlewares/check-user.js';
import upload from '../middlewares/upload.js';
import { addCommentController, deleteCommentController, updateCommentController } from '../controllers/comments/index.js';
import {addVoteController, deleteVoteController} from '../controllers/votes/index.js';

const router = express.Router();

/* /posts */
router
    .get("/", listPostController)
    .get("/random", randomPostsController)
    .get("/:idPost", showPostController)
    .post("/", checkUser, createPostController)
    .patch("/:idPost", checkUser, updatePostController)
    .delete("/:idPost", checkUser, deletePostController)

    //relacionadas con media
    .post("/:idPost/media", checkUser,  upload, createMediaPostController)

    //comments
    .post("/:idPost/comments",checkUser, addCommentController)
    .patch("/:idPost/comments/:idComment",checkUser, updateCommentController)
    .delete("/:idPost/comments/:idComment", checkUser, deleteCommentController)

    //votes
    .post("/:idPost/votes/:voteType?", checkUser, addVoteController)
    .delete("/:idPost/votes", checkUser, deleteVoteController)



export default router
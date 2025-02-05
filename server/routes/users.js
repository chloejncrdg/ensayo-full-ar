import express from "express"
import { deleteUser, getUser, updateUser } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

// update user
router.put("/:id", verifyToken, updateUser)

// delete user
router.delete("/:id", verifyToken, deleteUser)

// get a user 
router.get("/find/:id", getUser)

// enroll in course


export default router
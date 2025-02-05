import { createError } from "../error.js"
import User from "../models/User.js"

export const updateUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body
            },
                { new: true }

        )
            res.status(200).json(updatedUser)
        } catch(err) {
            next(err)
        }

    } else {
        return next(createError(403, "You can update only your account!"))
    }

}

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id,
        )
            res.status(200).json("User has been deleted")
        } catch(err) {
            next(err)
        }

    } else {
        return next(createError(403, "You can update only your account!"))
    }

}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(createError(404, "User not found!"))
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};


// export const enrollCourse = (req, res, next) => {

// }
import { isValidObjectId } from 'mongoose'

const checkObjectId = (req, res, next) => {
    if (isValidObjectId)
        return next()

    res.status(404)
    throw new Error(`Invalid ObjectId of : ${req.params.id}`)
}

export default checkObjectId

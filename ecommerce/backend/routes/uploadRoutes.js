import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const fileExt = path.extname(file.originalname)
        cb(null, `${path.basename(file.originalname, fileExt)}-${Date.now()}${fileExt}`)
    }
})

function fileFilter(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const mimeTypes = /image\/jpe?d|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = mimeTypes.test(file.mimetype);

    if (extname && mimetype)
        return cb(null, true)
    else cb(new Error('Images Only!'), false)
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            res.status(400).send({ message: err.message })
        }
    })

    res.status(200).send({
        message: 'Image Uploaded successfully',
        image: `/${req.file.path}`
    })
})

export default router
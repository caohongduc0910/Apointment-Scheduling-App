import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

import '../../../config/cloudinary.js'

const uploadToCloudinary = (req, res, next) => {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result)
                        } else {
                            reject(error);
                        }
                    }
                )
                streamifier.createReadStream(req.file.buffer).pipe(stream)
            })
        }

        async function upload(req) {
            let result = await streamUpload(req)
            req.body.image = result.url
            next()
        }
        upload(req)
    }
    else {
        next()
    }
}

export default uploadToCloudinary
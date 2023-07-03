const multer = require('multer');
const multerS3 = require('multer-s3')
const BUKET = process.env.LIARA_BUCKET_NAME;

const config = {
    endpoint: process.env.LIARA_ENDPOINT,
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
    region: process.env.REGION,
};

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    fileFilter:(re,file,cb)=>{
        if(
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }
})

module.exports = {upload}

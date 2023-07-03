const express = require('express')
const { singleFileUpload, updateSingleFile } = require('../Controllers/fileUploadController')
const { upload } = require('../helpers/filehelper')


const router = express.Router()

router.route('/single').post(upload.single('file'),singleFileUpload)
router.route('/updatesingle').put(upload.single('file'),updateSingleFile)



module.exports = router


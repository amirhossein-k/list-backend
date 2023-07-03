const express= require('express')
const { getList,createList,deleteList,updateList } = require('../Controllers/listControlers')
const { upload } = require('../helpers/filehelper')

const router = express.Router()


router.route('/').get(getList)
router.route('/create').post(createList)
router.route('/delete/:_id/:key/:pic_id').delete(deleteList)
router.route('/update').put(updateList)


module.exports = router
const asyncHandler = require('express-async-handler')

const List = require('../Models/listModel')
const uploadeSingle = require('../Models/uploadeSingle')
const { s3DeleteSingle } = require('../s3Service')

const getList = asyncHandler(async(req,res)=>{
    
    const list = await List.find({})

    if(list){
        res.status(200).json(list)
    }else{
        res.status(404).json({error: 'پیدا نشد'})
        throw new Error('List not found ')
    }
})

const createList = asyncHandler(async(req,res)=>{
    const {title_value,price_value,priceTo_value,describe_value,picc,pic_id} = req.body
    // const getlist = await List.find({})
   console.log(title_value,'title')
   console.log(priceTo_value,'price')
   console.log(typeof priceTo_value,'price typ')
    const newlist = await List.create({
        title_value,price_value,priceTo_value,describe_value,picc,pic_id
    })
    if(newlist){
        console.log(newlist,'nre')
        res.status(201).json({message: 'اضافه شد'})
    }else{
        res.status(400).json({error:  `مشکلی پیش امده لطفا وصل بودن اینترنت خود مظمئن شوید`})
        throw new Error('occur error to create')
    }
})

const deleteList = asyncHandler(async(req,res)=>{
    const {_id} = req.params
    console.log(_id)
    const liste = await List.findOne({_id})
    const listuploade = await uploadeSingle.findByIdAndDelete(req.params.pic_id)
    const resultdelete = await s3DeleteSingle(req.file,req.params.key)
    console.log(req.params.pic_id,'ggt')
    if(resultdelete && listuploade){
        console.log(liste,'lis')
        const list = await List.deleteOne({_id})
    
        if(list){
            console.log(list)
            res.json({message: 'Removed'})
        }else{
            res.status(404).json({message: 'Dont found this item'})
            throw new Error('Item not found')
        }
    }else{
        res.status(401).json({message: 'photo cant delete'})
        throw new Error('cant delete photo')
    }
    


})

const updateList = asyncHandler(async(req,res)=>{
  
    const {title_value,price_value,priceTo_value,describe_value,picc,id,pic_id} =req.body
    console.log(id,'iddd')
    const list = await List.findOne({_id:id})
    console.log(list,'list')
    if(list){
        list.title_value =title_value
        list.price_value =price_value
        list.priceTo_value =priceTo_value
        list.describe_value =describe_value
        list.picc =picc
        list.pic_id =pic_id

        const update = await list.save()
        res.json({update,message: 'اپدیت شد'})
    }else {
        res.status(404);
        throw new Error(`product not found ${id}`);
      }


})

module.exports ={getList,createList,deleteList,updateList}
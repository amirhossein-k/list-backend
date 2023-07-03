const UploadeSingle = require("../Models/uploadeSingle");
const { s3Uploade, s3DeleteSingle } = require("../s3Service");


const singleFileUpload = async (req,res)=>{
    try{

        const result = await s3Uploade(req.file)

        const file = {
            fileName: req.file.originalname,
            filePath: result.Location,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormater(req.file.size,2),
            fileKey: result.Key
        }

        const singlefile = new UploadeSingle({
            title: req.body.title,
            file:file
        })
        await singlefile.save()

        res.status(201).json({file,_id:singlefile._id})
    }
    catch (error) {
        res.status(400).send(error.message);
      }
}






const updateSingleFile =async(req,res,next)=>{
    try{
      const {title,key}= req.body
      console.log(req.body.key,'req.body.key')
      console.log(req.body.title,'req.body.title')
      const resultdelete = await s3DeleteSingle(req.file,req.body.key)
      const result = await s3Uploade(req.file)
      const files =  await UploadeSingle.findOne({title:title})
      console.log(req.file.originalname,'origii')
       const  file = {
          fileName:  req.file.originalname,
          filePath:  result.Location,
          fileType:  req.file.mimetype,
          fileSize: fileSizeFormater( req.file.size, 2),
          fileKey: result.Key
        };

        files.title=  req.body.title,
        files.file= file

  
        await files.save()
        res.status(201).json(files)

      
    }catch (erorr) {
      res.status(400).send(erorr.message);
    }
  }



  const fileSizeFormater = (bytes,decimal)=>{
    if(bytes === 0){
        return '0 Bytes'
    }
    const dm = decimal || 2
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index =Math.floor(Math.log(bytes) / Math.log(1000))
    return(
        parseFloat( (bytes / Math.pow(1000,index)).toFixed(dm)) + ' ' + sizes[index]
    )

}


module.exports = {singleFileUpload,updateSingleFile}


































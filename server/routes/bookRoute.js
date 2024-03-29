import express from "express"
import { Book } from "../models/bookModel.js"

const router=express.Router()

router.post('/',async(request,response)=>{
    try{
      if(
        !request.body.title||
        !request.body.author||
        !request.body.publishYear
      ){
        return response.status(400).send({
            message:'send all required fileds:t,a,py'
        })
      }
    const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear
    }
    const book = await Book.create(newBook);
    return response.status(201).send(book);
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})
router.get('/',async (request,response)=>{
   try {
    const books=await Book.find({})
    return response.status(200).json({
        count:books.length,
        data:books
    })

   } catch (error) {
    console.log(error)
    response.status(500).send({message:error.message})
   }
})
router.get('/:id',async(request,response)=>{
    try {
        const {id} = request.params
        const book = await Book.findById(id) 
        return response.status(200).json(book)
    } catch (error) {
        console.log(error)
        response.status(500).send({message:error.message})
    }
})
router.put('/:id',async(request,response)=>{
    try{
      if(
        !request.body.title||
        !request.body.author||
        !request.body.publishYear
      ){
        return response.status(400).send({
            message:'send all required fileds:t,a,py'
        })
      }
    const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear
    }
    const {id} = request.params
    const book = await Book.findByIdAndUpdate(id,newBook ,{ new: true });
    if(!book){
    return response.status(404).send({message:"book not found"});
    }
    return response.status(201).send({message:"book updated successfully"});
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

router.delete('/:id',async(request,response)=>{
    try {
        const {id} = request.params
        const book = await Book.findByIdAndDelete(id) 
        if(!book){
            return response.status(404).json({message:"book not found"})
        }
        return response.status(200).json({message:"book deleted succesfully"})
    } catch (error) {
        console.log(error)
        response.status(500).send({message:error.message})
    }
})
export default router;
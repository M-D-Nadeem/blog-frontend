import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../routers/axiosInstance.js";
import toast from "react-hot-toast";

const courseSlice=createSlice({
    name:"blogs",
    initialState:{
        blogsData:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(getAllBlogs.fulfilled,(state,action)=>{
        
        state.blogsData=[...action?.payload?.result]
       
       })
       
    }
})

export const getAllBlogs=createAsyncThunk("/getAll",async ()=>{
    try{
        const response=axiosInstance.get("/post/getAll")
        toast.promise(response,{
            loading:"loading blogs data...",
            success:"Blogs loaded successfully",
            error:"Failed to get blogs"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const getBlogById=createAsyncThunk("/getAll",async (id)=>{
    try{
        const response=axiosInstance.get(`/post/getById/${id}`)
        toast.promise(response,{
            loading:"loading blogs data...",
            success:"Blogs loaded successfully",
            error:"Failed to get blogs"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const editBlog=createAsyncThunk("/editBlog",async ({formData,id})=>{
    try{
        const response=axiosInstance.put(`/post/update/${id}`,formData)
        
        toast.promise(response,{
            loading:"Update on process...",
            success:"Blogs updated successfully",
            error:"Failed to update blogs"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const DeleteBlog=createAsyncThunk("/deleteBlog",async (id)=>{
    try{
        const response=axiosInstance.delete(`/post/delete/${id}`)
        
        toast.promise(response,{
            loading:"",
            success:"Blogs deleted successfully",
            error:"Failed to delete blogs"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})

export const CreateBlog=createAsyncThunk("/addBlog",async (data)=>{
    try{
        const response=axiosInstance.post(`/post/create`,data)
        toast.promise(response,{
            loading:"Creating new blog..",
            success:"Blog created successfully",
            error:"Failed to create blog"
        })
        return (await response).data

    }
    catch(err){
        toast.error(err?.response?.data?.message)
    }
})


export const { } = courseSlice.actions;
export default courseSlice.reducer;
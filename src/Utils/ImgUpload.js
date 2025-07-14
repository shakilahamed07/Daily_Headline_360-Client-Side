import axios from "axios";

export const uploadImg = async (img) =>{
    
    const formData = new FormData();
    formData.append('image', img)

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Api}`, formData)

    return res.data.data.display_url;
}
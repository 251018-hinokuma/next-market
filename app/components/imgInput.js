import { useState } from "react";

const ImgInput=(props)=>{
    const [imageFile,setImageFile]=useState("")
    const handleClick=async()=>{
        try{
            const data=new FormData()
            data.append("file",imageFile)
            data.append("upload_preset","ml_default")
            data.append("cloud_name","dk2pi2klp")
            const response=await fetch("https://api.cloudinary.com/v1_1/dk2pi2klp/image/upload",{method:"POST",body:data})
            const jsonData =await response.json()
            await props.setImage(jsonData.secure_url)
            alert("画像アップロード成功")
        }catch{
            alert("画像アップロード失敗")
        }
}
    return(
        <div className="img-input">
            <input type="file" onChange={(e)=>
                   setImageFile(e.target.files[0]?? null)
            } accept="image/*"/>
            <button onClick={handleClick} disabled={!imageFile}>画像アップロード</button>
         </div>
    )
    }
export default ImgInput
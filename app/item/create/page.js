"use client"
import { useState } from "react"
import { useRouter } from "next/navigation" 
import useAuth from "../../utils/useAuth"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ImgInput from "../../components/imgInput"
const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()
    const loginUserEmail = useAuth() 
    console.log(loginUserEmail )

    const handleSubmit = async(e) => {
        e.preventDefault() 
        try{
            const response = await fetch("http://localhost:3000/api/item/create", {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail  
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)  
            router.push("/") 
            router.refresh()
        }catch{
            alert("アイテム作成失敗") 
        }
    }

    
if(loginUserEmail){
        return (
           
            <div>
                <Header/>
                <h1 className="page-title">アイテム作成</h1>
                
                <form onSubmit={handleSubmit}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                    {/* <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像"  required/> */}
                    <ImgInput setImage={setImage} value={image}/>
                {image && (
                    <div className="uploaded-preview">
                    <p>アップロード完了</p>

                         <img src={image} width="200" />

                    <input value={image} readOnly />
                     </div>
                    )}
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
                    <button>作成</button>
                </form>
                <Footer/>
            </div>
        )
    }  
}

export default CreateItem
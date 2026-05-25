
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation" 
import Header from "../../components/header"
import Footer from "../../components/footer"
const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const router = useRouter()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(0)
        try {
            const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
            })
            console.log(1)
            const jsonData=await response.json()
            localStorage.setItem("token",jsonData.token)
            alert(jsonData.message)
            router.push("/") 
            router.refresh()
        } catch{
            alert("ログイン失敗")
        }
    }


    return(
        <div>
            <Header/>
        <h1>ログイン</h1>
        <form className="page-title" onSubmit={handleSubmit}>
            <input value={email} onChange={(e)=>{
                setEmail(e.target.value)
                }}
                type="text" name="email" placeholder="メールアドレス" required></input>
            <input value={password} onChange={(e)=>{
                setPassword(e.target.value)
                }}type="text" name="password" placeholder="パスワード" required></input>
            <button>ログイン</button>
        </form>
        <Footer/>
        </div>
    )
}

export default Login
"use client"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { useState } from "react"

const Register=()=>{
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log(0)
        try {
            const response=await fetch("${process.env.NEXT_PUBLIC_URL}/api/user/register",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password
                })
            })
            console.log(1)
            const jsonData=await response.json()
            console.log(22)
            alert(jsonData.message)
        } catch{
            alert("ユーザー登録失敗")
        }
    }    
    return(
        <div>
            <Header/>
            <h1>ユーザー登録</h1>
            <form className="page-title" onSubmit={handleSubmit}>
                <input value={name} onChange={(e)=>{
                    setName(e.target.value)
                    }}  type="text" name="name" placeholder="名前" required></input>
                <input value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                    }} type="text" name="email" placeholder="メールアドレス" required></input>
                <input value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                    }} type="text" name="password" placeholder="パスワード" required></input>
                <button>登録</button>
            </form>
            <Footer/>
        </div>
    )
}

export default Register
"use client";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  async function submit(e:FormEvent){
    e.preventDefault(); setError("");
    try { await signInWithEmailAndPassword(auth,email,password); router.push("/chat"); }
    catch { setError("メールアドレスまたはパスワードが正しくありません。"); }
  }

  return <main className="auth">
    <section className="card authCard">
      <div className="brand"><span className="brandMark">T</span><span>TakeChat</span></div>
      <p className="muted">旅行中のためのチャット</p>
      <form onSubmit={submit}>
        <label>メールアドレス<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required autoComplete="email"/></label>
        <label>パスワード<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required autoComplete="current-password"/></label>
        {error && <p className="error">{error}</p>}
        <button className="primary" type="submit">ログイン</button>
      </form>
      <a className="linkButton" href="/register">アカウントを作成</a>
    </section>
  </main>
}
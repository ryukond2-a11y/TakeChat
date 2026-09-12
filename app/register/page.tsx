"use client";
import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Register() {
  const router=useRouter();
  const [name,setName]=useState(""); const [displayName,setDisplayName]=useState("");
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [agree,setAgree]=useState(false); const [error,setError]=useState("");

  async function submit(e:FormEvent){
    e.preventDefault(); setError("");
    if(!agree){setError("利用・データ取り扱いへの同意が必要です。"); return;}
    if(password.length<10){setError("パスワードは10文字以上にしてください。"); return;}
    try {
      const cred=await createUserWithEmailAndPassword(auth,email,password);
      await fetch("/api/profile",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({uid:cred.user.uid,name,displayName,email})});
      router.push("/setup");
    } catch { setError("アカウントを作成できませんでした。メールアドレスを確認してください。"); }
  }

  return <main className="auth"><section className="card authCard">
    <div className="brand"><span className="brandMark">T</span><span>TakeChat</span></div>
    <p className="muted">アカウントを作成</p>
    <form onSubmit={submit}>
      <label>本名<input value={name} onChange={e=>setName(e.target.value)} required /></label>
      <label>表示名<input value={displayName} onChange={e=>setDisplayName(e.target.value)} required /></label>
      <label>メールアドレス<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required /></label>
      <label>パスワード<input value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength={10} required />
        <small>10文字以上。他サービスと同じパスワードや、機密性の高い情報は入力しないでください。</small>
      </label>
      <div className="consent">
        <label className="check"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/>
        <span>利用・データ取り扱いに同意する</span></label>
        <p>TakeChatでは、運営・安全確保・不正利用対応のため、アカウント情報、メッセージ、画像などのサービス上のデータを管理者が確認できる場合があります。機密情報や他サービスのパスワードは送信しないでください。パスワードは暗号学的ハッシュとして扱われ、管理者を含む第三者が元のパスワードを閲覧できる仕様にはしません。</p>
      </div>
      {error && <p className="error">{error}</p>}
      <button className="primary" type="submit">アカウント作成</button>
    </form>
  </section></main>
}
"use client";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Setup(){
  const router=useRouter(); const [installed,setInstalled]=useState(false); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  useEffect(()=>{ setInstalled(window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone===true); },[]);
  async function enable(){
    setBusy(true); setMessage("");
    try{
      if(!installed){setMessage("先にTakeChatをホーム画面へ追加してください。"); return;}
      const permission=await Notification.requestPermission();
      if(permission!=="granted"){setMessage("通知が許可されませんでした。iPadの設定から変更できます。");return;}
      const m=await messaging(); if(!m) throw new Error();
      const token=await getToken(m,{vapidKey:process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY});
      await fetch("/api/push",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token})});
      setMessage("通知を有効にしました。");
    }catch{setMessage("通知の設定に失敗しました。HTTPSとFirebase設定を確認してください。");}
    finally{setBusy(false);}
  }
  return <main className="auth"><section className="card setupCard">
    <div className="brand"><span className="brandMark">T</span><span>TakeChat</span></div>
    <h1>通知を設定しよう</h1>
    <p>メッセージを受け取ったとき、TakeChatを開いていなくても通知できるようにします。</p>
    <div className="steps"><div><b>1</b> Safariの共有ボタンをタップ</div><div><b>2</b> 「ホーム画面に追加」を選択</div><div><b>3</b> ホーム画面からTakeChatを開く</div><div><b>4</b> 下のボタンで通知を許可</div></div>
    {!installed && <div className="notice">現在はSafariから開いているようです。ホーム画面に追加してから、このアプリを開き直してください。</div>}
    {message && <div className="notice">{message}</div>}
    <button className="primary" onClick={enable} disabled={busy}>{busy?"設定中…":"通知を有効にする"}</button>
    <button className="ghost" onClick={()=>router.push("/chat")}>あとで設定する</button>
  </section></main>
}
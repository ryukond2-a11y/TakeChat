"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const demo=[{id:1,name:"旅行グループ",text:"集合は8:30！",time:"08:12",unread:2},{id:2,name:"田中",text:"写真送ったよ",time:"昨日",unread:0},{id:3,name:"鈴木",text:"了解！",time:"昨日",unread:0}];

export default function Chat(){
 const router=useRouter(); const [user,setUser]=useState<any>(null); const [dark,setDark]=useState(false); const [selected,setSelected]=useState(1); const [text,setText]=useState(""); const [messages,setMessages]=useState<any[]>([]);
 useEffect(()=>onAuthStateChanged(auth,u=>{if(!u)router.replace("/login");else setUser(u)}),[router]);
 useEffect(()=>document.documentElement.dataset.theme=dark?"dark":"light",[dark]);
 function send(){if(!text.trim())return;setMessages(x=>[...x,{mine:true,text:text.trim(),time:new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})}]);setText("");}
 if(!user)return <div className="loading">Loading…</div>;
 return <main className="appShell">
   <aside className="sidebar">
    <header><div className="brand"><span className="brandMark">T</span><span>TakeChat</span></div><button className="icon" onClick={()=>setDark(!dark)} title="テーマ切替">{dark?"☀":"☾"}</button></header>
    <input className="search" placeholder="検索"/>
    <div className="sectionTitle">チャット</div>
    {demo.map(c=><button key={c.id} className={"chatItem "+(selected===c.id?"active":"")} onClick={()=>setSelected(c.id)}>
      <span className="avatar">{c.name.slice(0,1)}</span><span className="chatMeta"><b>{c.name}</b><small>{c.text}</small></span>{c.unread>0&&<span className="badge">{c.unread}</span>}
    </button>)}
    <div className="sidebarBottom"><button className="ghost" onClick={()=>router.push("/settings")}>設定</button><button className="ghost" onClick={()=>signOut(auth)}>ログアウト</button></div>
   </aside>
   <section className="conversation">
    <header className="conversationHeader"><div><h2>{demo.find(x=>x.id===selected)?.name}</h2><small>オンライン</small></div><button className="icon">⋯</button></header>
    <div className="messages">
      <div className="date">今日</div>
      <div className="bubble">TakeChatへようこそ！<span>08:10</span></div>
      {messages.map((m,i)=><div key={i} className={"bubble "+(m.mine?"mine":"")}><span>{m.text}</span><small>{m.time}</small></div>)}
    </div>
    <div className="composer"><button className="attach">＋</button><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="メッセージを入力…" /><button className="send" onClick={send}>送信</button></div>
   </section>
 </main>
}
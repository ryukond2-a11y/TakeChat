"use client";
import {useEffect,useState} from "react";
export default function Settings(){
 const [dark,setDark]=useState(false);
 useEffect(()=>{setDark(document.documentElement.dataset.theme==="dark")},[]);
 function toggle(){const n=!dark;setDark(n);document.documentElement.dataset.theme=n?"dark":"light";localStorage.setItem("theme",n?"dark":"light")}
 return <main className="settings"><section className="card settingsCard"><a href="/chat" className="back">← チャット</a><h1>設定</h1>
 <div className="settingRow"><div><b>ダークモード</b><p>TakeChatの表示テーマを変更します。</p></div><button className={"switch "+(dark?"on":"")} onClick={toggle}><span/></button></div>
 <div className="settingRow"><div><b>通知</b><p>iPadの通知設定は端末側からも変更できます。</p></div><a className="smallButton" href="/setup">通知設定</a></div>
 </section></main>
}
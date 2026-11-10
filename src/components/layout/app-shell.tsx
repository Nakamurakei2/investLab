"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, ArrowDownUp, Bell, ChevronDown, CircleHelp, Command, LayoutDashboard, Menu, Search, Settings2, ShieldCheck, WalletCards, X } from "lucide-react";
const nav = [
  { label: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
  { label: "銘柄を探す", href: "/assets", icon: Search },
  { label: "ポートフォリオ", href: "/portfolio", icon: WalletCards },
  { label: "注文履歴", href: "/orders", icon: ArrowDownUp },
  { label: "取引履歴", href: "/transactions", icon: Activity },
];
export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname(); const [menuOpen, setMenuOpen] = useState(false); const [search, setSearch] = useState("");
  return <div className="app-frame">
    {menuOpen && <button className="sidebar-scrim" aria-label="メニューを閉じる" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="brand-row"><Link href="/dashboard" className="brand" onClick={() => setMenuOpen(false)}><span className="brand-mark"><Activity size={19} /></span><span className="brand-name">invest<span>lab</span></span></Link><button className="mobile-close" aria-label="メニューを閉じる" onClick={() => setMenuOpen(false)}><X size={18}/></button></div>
      <div className="workspace-picker"><span className="workspace-avatar">S</span><span className="workspace-copy"><strong>サンプル口座</strong><small>シミュレーション</small></span><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div><nav className="side-nav" aria-label="メインメニュー">{nav.map(({label,href,icon:Icon})=><Link key={href} href={href} onClick={()=>setMenuOpen(false)} className={`nav-link ${path===href?"nav-active":""}`}><Icon size={18}/><span>{label}</span>{href==="/orders"&&<span className="nav-count">2</span>}</Link>)}</nav>
      <div className="nav-label nav-label-spaced">PREFERENCES</div><nav className="side-nav"><Link href="/settings" onClick={()=>setMenuOpen(false)} className={`nav-link ${path==="/settings"?"nav-active":""}`}><Settings2 size={18}/><span>設定</span></Link><a href="mailto:hello@investlab.example" className="nav-link"><CircleHelp size={18}/><span>ヘルプセンター</span></a></nav>
      <div className="sidebar-bottom"><div className="simulation-note"><span className="note-icon"><ShieldCheck size={17}/></span><div><strong>シミュレーション専用</strong><p>実際の資金は使用しません</p></div></div><button className="user-card"><span className="user-avatar">YT</span><span className="user-copy"><strong>山田 太郎</strong><small>個人プラン</small></span><ChevronDown size={15}/></button></div>
    </aside>
    <main className="main-column"><header className="topbar"><button className="mobile-menu" aria-label="メニューを開く" onClick={()=>setMenuOpen(true)}><Menu size={20}/></button><div className="breadcrumb"><span>ワークスペース</span><span className="breadcrumb-slash">/</span><strong>{nav.find(item=>item.href===path)?.label??(path==="/settings"?"設定":"ダッシュボード")}</strong></div><div className="topbar-actions"><label className="search-box"><Search size={16}/><input aria-label="銘柄を検索" value={search} onChange={e=>setSearch(e.target.value)} placeholder="銘柄・コードを検索"/><kbd><Command size={11}/> K</kbd></label><button className="icon-button notification-button" aria-label="通知"><Bell size={18}/><i/></button><span className="topbar-divider"/><button className="market-status"><i/>市場情報 <ChevronDown size={14}/></button></div></header>{children}</main>
  </div>;
}

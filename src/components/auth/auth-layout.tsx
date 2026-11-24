import Link from "next/link";
import { Activity, ArrowUpRight, ChartNoAxesCombined, ShieldCheck, Sparkles } from "lucide-react";

export function AuthLayout({ children, mode }: Readonly<{ children: React.ReactNode; mode: "login" | "signup" }>) {
  return <main className="auth-shell" data-auth-mode={mode}>
    <section className="auth-story">
      <Link href="/dashboard" className="auth-brand"><span className="brand-mark"><Activity size={19}/></span><span className="brand-name">invest<span>lab</span></span></Link>
      <div className="story-content">
        <span className="story-kicker"><Sparkles size={13}/> INVEST WITH CLARITY</span>
        <h1>投資を、もっと<br/><span>自分らしく。</span></h1>
        <p>仮想資金で、あなたの投資アイデアを自由に試してみましょう。</p>
        <div className="story-chart-card"><div className="story-chart-top"><span>ポートフォリオの成長</span><span className="story-chart-pill"><ArrowUpRight size={12}/> +12.8%</span></div><strong>¥12,486,320</strong><small>過去30日間 <b>+¥284,320</b></small><svg viewBox="0 0 440 118" preserveAspectRatio="none" aria-label="ポートフォリオ推移のイメージ"><defs><linearGradient id="authChartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#88a6ff" stopOpacity=".32"/><stop offset="100%" stopColor="#88a6ff" stopOpacity="0"/></linearGradient></defs><path d="M0 101 C28 95 34 82 65 89 S103 57 130 70 S162 64 190 55 S217 65 246 43 S280 52 302 36 S337 44 354 22 S389 39 411 14 S428 18 440 5 L440 118 L0 118Z" fill="url(#authChartFill)"/><path d="M0 101 C28 95 34 82 65 89 S103 57 130 70 S162 64 190 55 S217 65 246 43 S280 52 302 36 S337 44 354 22 S389 39 411 14 S428 18 440 5" fill="none" stroke="#9db4ff" strokeWidth="2.5" strokeLinecap="round"/></svg><div className="story-chart-dates"><span>10/12</span><span>10/19</span><span>10/26</span><span>11/02</span><span>11/10</span></div></div>
        <div className="story-trust"><span><ShieldCheck size={16}/> シミュレーション専用</span><span><ChartNoAxesCombined size={16}/> 日米の株式・ETFに対応</span></div>
      </div>
      <div className="story-footer">© 2026 InvestLab <span>投資体験を、もっと身近に。</span></div>
      <div className="story-orb orb-one"/><div className="story-orb orb-two"/>
    </section>
    <section className="auth-panel"><div className="auth-form-wrap">
      <div className="auth-mobile-brand"><Link href="/dashboard" className="auth-brand"><span className="brand-mark"><Activity size={19}/></span><span className="brand-name">invest<span>lab</span></span></Link></div>
      {children}
      <p className="auth-legal">続行すると、InvestLabの利用規約とプライバシーポリシーに同意したものとみなされます。</p>
    </div><div className="auth-panel-bottom"><ShieldCheck size={14}/>InvestLabは仮想資金によるシミュレーションサービスです。</div></section>
  </main>;
}

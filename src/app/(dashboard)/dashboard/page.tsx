"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  CircleDollarSign,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Wallet,
} from "lucide-react";
const holdings = [
  {
    ticker: "7203",
    name: "トヨタ自動車",
    market: "東証 · 日本株",
    value: "¥1,284,000",
    change: "+2.41%",
    up: true,
    initial: "T",
    color: "toyota",
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    market: "NASDAQ · 米国株",
    value: "$8,420.50",
    change: "+1.82%",
    up: true,
    initial: "●",
    color: "apple",
  },
  {
    ticker: "8306",
    name: "三菱UFJフィナンシャルG",
    market: "東証 · 日本株",
    value: "¥876,400",
    change: "−0.64%",
    up: false,
    initial: "M",
    color: "mufg",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    market: "NASDAQ · 米国株",
    value: "$5,216.00",
    change: "+4.26%",
    up: true,
    initial: "N",
    color: "nvidia",
  },
];
const transactions = [
  {
    symbol: "7203",
    name: "トヨタ自動車",
    kind: "買付",
    date: "今日 10:42",
    amount: "¥428,000",
    type: "buy",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    kind: "買付",
    date: "昨日 14:18",
    amount: "$2,104.00",
    type: "buy",
  },
  {
    symbol: "9984",
    name: "ソフトバンクグループ",
    kind: "売却",
    date: "11月08日",
    amount: "¥312,500",
    type: "sell",
  },
];
const charts: Record<string, string> = {
  "1W": "0,114 35,106 68,109 103,81 137,87 172,70 207,80 241,57 276,69 310,49 345,54 380,31 414,43 449,22 483,34 518,10 552,20 588,3",
  "1M": "0,115 35,101 68,106 103,77 137,85 172,72 207,88 241,60 276,65 310,43 345,58 380,34 414,45 449,20 483,34 518,14 552,24 588,3",
  "3M": "0,111 35,96 68,105 103,91 137,76 172,88 207,66 241,73 276,52 310,58 345,38 380,47 414,28 449,36 483,20 518,27 552,11 588,3",
  "1Y": "0,115 35,104 68,112 103,88 137,95 172,71 207,84 241,68 276,76 310,48 345,57 380,39 414,45 449,28 483,39 518,14 552,19 588,3",
  ALL: "0,116 35,105 68,110 103,92 137,101 172,80 207,86 241,67 276,79 310,51 345,60 380,38 414,50 449,29 483,38 518,13 552,23 588,3",
};
export default function DashboardPage() {
  const [range, setRange] = useState("1M"),
    [chartMode, setChartMode] = useState("資産推移");
  const points = charts[range];
  return (
    <div className="page-content dashboard-page">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            2026年11月10日 火曜日
          </div>
          <h1>
            おかえりなさい、太郎さん <span className="wave">✦</span>
          </h1>
          <p className="page-subtitle">
            今日のポートフォリオの状況を確認しましょう。
          </p>
        </div>
        <button
          className="button button-primary"
          onClick={() =>
            document
              .getElementById("holdings")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Plus size={17} />
          保有銘柄を見る
        </button>
      </div>
      <section className="summary-grid" aria-label="資産サマリー">
        <article className="summary-card balance-card">
          <div className="card-topline">
            <span className="card-label">
              <Wallet size={16} />
              総資産
            </span>
            <button className="quiet-icon" aria-label="総資産のオプション">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="metric-value">¥12,486,320</div>
          <div className="metric-foot">
            <span className="trend positive">
              <ArrowUpRight size={15} />
              ¥284,320 (2.33%)
            </span>
            <span className="subtle-text">先月比</span>
          </div>
          <div className="balance-sparkline">
            <svg
              viewBox="0 0 220 42"
              preserveAspectRatio="none"
              aria-label="総資産の上昇グラフ"
            >
              <path
                d="M0 34 C22 28 28 30 48 24 S76 31 96 17 S129 23 149 12 S180 18 194 7 S210 12 220 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </article>
        <article className="summary-card">
          <div className="card-topline">
            <span className="card-label">
              <CircleDollarSign size={16} />
              運用損益
            </span>
            <span className="tiny-badge badge-green">含み益</span>
          </div>
          <div className="metric-value">+¥1,248,620</div>
          <div className="metric-foot">
            <span className="trend positive">
              <ArrowUpRight size={15} />
              +11.12%
            </span>
            <span className="subtle-text">取得金額比</span>
          </div>
          <div className="mini-progress">
            <span style={{ width: "68%" }} />
          </div>
          <div className="mini-foot">
            <span>含み益の割合</span>
            <span>68%</span>
          </div>
        </article>
        <article className="summary-card">
          <div className="card-topline">
            <span className="card-label">
              <BriefcaseBusiness size={16} />
              保有銘柄
            </span>
            <span className="tiny-badge badge-blue">2市場</span>
          </div>
          <div className="metric-value">
            12<span className="metric-unit">銘柄</span>
          </div>
          <div className="metric-foot">
            <span className="subtle-text">日本株 8銘柄</span>
            <span className="dot-separator">·</span>
            <span className="subtle-text">米国株 4銘柄</span>
          </div>
          <div className="market-split">
            <span className="japan-split" />
            <span className="us-split" />
          </div>
          <div className="mini-foot">
            <span>
              日本株 <b>67%</b>
            </span>
            <span>
              米国株 <b>33%</b>
            </span>
          </div>
        </article>
        <article className="summary-card cash-card">
          <div className="card-topline">
            <span className="card-label">
              <CircleDollarSign size={16} />
              投資可能額
            </span>
            <button className="quiet-icon" aria-label="投資可能額のオプション">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="metric-value">¥2,840,000</div>
          <div className="metric-foot">
            <span className="subtle-text">口座資金の</span>
            <span className="cash-percent">22.7%</span>
            <span className="subtle-text">を保有</span>
          </div>
          <Link href="/assets" className="text-link">
            銘柄を探す <ArrowRight size={14} />
          </Link>
        </article>
      </section>
      <section className="panel chart-panel">
        <div className="panel-heading chart-heading">
          <div>
            <div className="panel-title-row">
              <h2>{chartMode}</h2>
              <button className="select-button">
                すべての資産 <ChevronDown size={14} />
              </button>
            </div>
            <div className="chart-total">
              ¥12,486,320{" "}
              <span className="trend positive">
                <ArrowUpRight size={14} />
                2.33%
              </span>
            </div>
            <div className="chart-caption">前期間比 ¥284,320</div>
          </div>
          <div className="chart-controls">
            <div className="segmented-control">
              {["資産推移", "損益"].map((mode) => (
                <button
                  key={mode}
                  className={chartMode === mode ? "selected" : ""}
                  onClick={() => setChartMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="range-control">
              {Object.keys(charts).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={range === item ? "range-selected" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="chart-wrap">
          <div className="chart-ylabels">
            <span>¥13M</span>
            <span>¥12M</span>
            <span>¥11M</span>
            <span>¥10M</span>
          </div>
          <div className="chart-plot">
            <div className="chart-gridlines">
              <i />
              <i />
              <i />
              <i />
            </div>
            <svg
              className="asset-chart"
              viewBox="0 0 588 126"
              preserveAspectRatio="none"
              role="img"
              aria-label={`${range}の資産推移グラフ`}
            >
              <defs>
                <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3867ed" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#3867ed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,126 ${points} 588,126`}
                fill="url(#chart-fill)"
              />
              <polyline
                points={points}
                fill="none"
                stroke="#3867ed"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx="588"
                cy="3"
                r="4.5"
                fill="#3867ed"
                stroke="white"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="chart-xlabels">
              <span>10/12</span>
              <span>10/19</span>
              <span>10/26</span>
              <span>11/02</span>
              <span>11/10</span>
            </div>
          </div>
        </div>
      </section>
      <div className="content-grid">
        <section className="panel holdings-panel" id="holdings">
          <div className="panel-heading">
            <div>
              <h2>保有銘柄</h2>
              <p className="panel-description">
                現在保有している銘柄の一覧です
              </p>
            </div>
            <Link href="/portfolio" className="panel-link">
              すべて見る <ArrowRight size={15} />
            </Link>
          </div>
          <div className="holdings-table">
            <div className="table-header">
              <span>銘柄</span>
              <span>評価額</span>
              <span>前日比</span>
            </div>
            {holdings.map((s) => (
              <Link
                href={`/assets?symbol=${s.ticker}`}
                className="holding-row"
                key={s.ticker}
              >
                <span className="holding-identity">
                  <span className={`ticker-icon ${s.color}`}>{s.initial}</span>
                  <span>
                    <strong>{s.name}</strong>
                    <small>
                      {s.ticker} <i>·</i> {s.market}
                    </small>
                  </span>
                </span>
                <span className="holding-value">{s.value}</span>
                <span
                  className={`holding-change ${s.up ? "positive" : "negative"}`}
                >
                  {s.up ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}{" "}
                  {s.change}
                </span>
              </Link>
            ))}
          </div>
          <Link href="/portfolio" className="mobile-view-all">
            保有銘柄をすべて見る <ArrowRight size={15} />
          </Link>
        </section>
        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h2>最近の取引</h2>
              <p className="panel-description">直近のシミュレーション取引</p>
            </div>
            <Link href="/transactions" className="panel-link">
              すべて見る <ArrowRight size={15} />
            </Link>
          </div>
          <div className="activity-list">
            {transactions.map((t) => (
              <div className="activity-row" key={t.symbol}>
                <span className={`activity-icon ${t.type}`}>
                  {t.type === "buy" ? (
                    <ArrowDownRight size={17} />
                  ) : (
                    <ArrowUpRight size={17} />
                  )}
                </span>
                <span className="activity-description">
                  <strong>{t.name}</strong>
                  <small>
                    {t.symbol} <i>·</i> {t.date}
                  </small>
                </span>
                <span className="activity-amount">
                  <strong>{t.amount}</strong>
                  <small className={t.type}>{t.kind}</small>
                </span>
              </div>
            ))}
          </div>
          <Link href="/orders" className="pending-order">
            <span className="pending-dot" />
            <span>
              <strong>未約定の注文</strong>
              <small>確認待ちの注文があります</small>
            </span>
            <span className="pending-count">2</span>
            <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      <div className="dashboard-footnote">
        <span>
          <ShieldCheck size={14} />
          これは投資シミュレーションです。実際の金融商品取引は行われません。
        </span>
        <Link href="/settings">
          シミュレーション設定 <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

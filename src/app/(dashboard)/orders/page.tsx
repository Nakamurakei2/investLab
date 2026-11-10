"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  CircleDashed,
  Clock3,
} from "lucide-react";
const rows = [
  {
    symbol: "7203",
    name: "トヨタ自動車",
    side: "買い",
    type: "指値",
    shares: "100 株",
    price: "¥2,800",
    date: "2026/11/10 10:42",
    status: "約定待ち",
    kind: "pending",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    side: "買い",
    type: "指値",
    shares: "10 株",
    price: "$270.00",
    date: "2026/11/10 09:15",
    status: "約定待ち",
    kind: "pending",
  },
  {
    symbol: "9984",
    name: "ソフトバンクグループ",
    side: "売り",
    type: "成行",
    shares: "50 株",
    price: "—",
    date: "2026/11/08 13:02",
    status: "約定済み",
    kind: "done",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    side: "買い",
    type: "指値",
    shares: "8 株",
    price: "$160.00",
    date: "2026/11/07 11:30",
    status: "約定済み",
    kind: "done",
  },
];
export default function OrdersPage() {
  const [filter, setFilter] = useState("すべて");
  const visible = rows.filter(
    (r) =>
      filter === "すべて" ||
      (filter === "約定待ち" ? r.kind === "pending" : r.kind === "done"),
  );
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            ORDER ACTIVITY
          </div>
          <h1>注文履歴</h1>
          <p className="page-subtitle">
            シミュレーション注文の状態を確認できます。
          </p>
        </div>
        <div className="orders-live-tag">
          <CircleDashed size={15} />
          売買機能は準備中です
        </div>
      </div>
      <div className="order-summary">
        <div>
          <span>すべての注文</span>
          <strong>18</strong>
          <small>今月</small>
        </div>
        <div>
          <span>約定待ち</span>
          <strong className="amber-text">02</strong>
          <small>確認待ち</small>
        </div>
        <div>
          <span>約定済み</span>
          <strong>16</strong>
          <small>今月の約定</small>
        </div>
      </div>
      <section className="panel orders-panel">
        <div className="browser-toolbar">
          <div>
            <h2>注文一覧</h2>
            <p className="panel-description">注文状況と詳細</p>
          </div>
          <button className="sort-button">
            期間：今月 <ChevronDown size={14} />
          </button>
        </div>
        <div className="filter-row">
          <div className="filter-tabs">
            {["すべて", "約定待ち", "約定済み"].map((x) => (
              <button
                key={x}
                className={filter === x ? "filter-active" : ""}
                onClick={() => setFilter(x)}
              >
                {x}
                {x === "約定待ち" && <i className="tab-count">2</i>}
              </button>
            ))}
          </div>
        </div>
        <div className="orders-table">
          <div className="orders-head">
            <span>銘柄</span>
            <span>売買</span>
            <span>注文内容</span>
            <span>注文日時</span>
            <span>ステータス</span>
          </div>
          {visible.map((x) => (
            <div className="order-row" key={x.symbol}>
              <Link
                href={`/assets?symbol=${x.symbol}`}
                className="order-security"
              >
                <span
                  className={`ticker-icon ${x.symbol === "AAPL" ? "apple" : x.symbol === "NVDA" ? "nvidia" : "toyota"}`}
                >
                  {x.symbol.slice(0, 1)}
                </span>
                <span>
                  <strong>{x.name}</strong>
                  <small>{x.symbol}</small>
                </span>
              </Link>
              <span
                className={`side-badge ${x.side === "買い" ? "side-buy" : "side-sell"}`}
              >
                {x.side === "買い" ? (
                  <ArrowDownRight size={14} />
                ) : (
                  <ArrowUpRight size={14} />
                )}{" "}
                {x.side}
              </span>
              <span className="order-detail">
                <strong>
                  {x.type}・{x.shares}
                </strong>
                <small>{x.price}</small>
              </span>
              <span className="order-date">{x.date}</span>
              <span className={`status-pill ${x.kind}`}>
                <i />
                {x.status}
              </span>
            </div>
          ))}
        </div>
        <div className="orders-foot">
          <span>{visible.length}件を表示</span>
          <button disabled>前へ</button>
          <button className="current-page">1</button>
          <button disabled>次へ</button>
        </div>
      </section>
      <div className="notice-card">
        <Clock3 size={17} />
        <span>
          <strong>注文機能は現在準備中です</strong>
          <small>
            この画面の注文はデモ用の表示です。実際の証券会社への発注は行われません。
          </small>
        </span>
      </div>
    </div>
  );
}

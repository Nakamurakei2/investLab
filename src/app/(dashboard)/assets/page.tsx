"use client";
import { useMemo, useState } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
const data = [
  {
    symbol: "7203",
    name: "トヨタ自動車",
    market: "日本株 · 東証プライム",
    price: "¥2,846",
    change: "+2.41%",
    up: true,
    category: "自動車",
    brand: "T",
    tone: "toyota",
  },
  {
    symbol: "8306",
    name: "三菱UFJフィナンシャル・グループ",
    market: "日本株 · 東証プライム",
    price: "¥1,782.5",
    change: "−0.64%",
    up: false,
    category: "銀行",
    brand: "M",
    tone: "mufg",
  },
  {
    symbol: "6758",
    name: "ソニーグループ",
    market: "日本株 · 東証プライム",
    price: "¥3,412",
    change: "+1.28%",
    up: true,
    category: "テクノロジー",
    brand: "S",
    tone: "sony",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    market: "米国株 · NASDAQ",
    price: "$273.62",
    change: "+1.82%",
    up: true,
    category: "テクノロジー",
    brand: "●",
    tone: "apple",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    market: "米国株 · NASDAQ",
    price: "$182.41",
    change: "+4.26%",
    up: true,
    category: "半導体",
    brand: "N",
    tone: "nvidia",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    market: "米国株 · NASDAQ",
    price: "$511.23",
    change: "+0.76%",
    up: true,
    category: "テクノロジー",
    brand: "M",
    tone: "microsoft",
  },
];
export default function AssetsPage() {
  const [query, setQuery] = useState(""),
    [market, setMarket] = useState("すべて"),
    [watch, setWatch] = useState<string[]>(["AAPL", "NVDA"]);
  const filtered = useMemo(
    () =>
      data.filter(
        (x) =>
          (market === "すべて" ||
            (market === "日本株"
              ? x.market.startsWith("日本")
              : x.market.startsWith("米国"))) &&
          `${x.name} ${x.symbol} ${x.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, market],
  );
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            MARKET EXPLORER
          </div>
          <h1>銘柄を探す</h1>
          <p className="page-subtitle">
            日本株・米国株の銘柄を見つけて、ウォッチリストに追加できます。
          </p>
        </div>
      </div>
      <section className="market-banner">
        <div className="market-banner-title">
          <span className="live-pill">
            <i />
            LIVE
          </span>
          <strong>マーケット概況</strong>
          <span className="market-updated">2026/11/10 15:30 更新</span>
        </div>
        <div className="market-tickers">
          <div>
            <span>日経平均</span>
            <strong>¥51,284.67</strong>
            <em className="positive">
              <ArrowUpRight size={14} />
              +0.82%
            </em>
          </div>
          <div>
            <span>TOPIX</span>
            <strong>3,412.08</strong>
            <em className="positive">
              <ArrowUpRight size={14} />
              +0.64%
            </em>
          </div>
          <div>
            <span>S&amp;P 500</span>
            <strong>6,812.44</strong>
            <em className="positive">
              <ArrowUpRight size={14} />
              +0.38%
            </em>
          </div>
          <div>
            <span>NASDAQ</span>
            <strong>23,461.80</strong>
            <em className="negative">
              <ArrowDownRight size={14} />
              −0.12%
            </em>
          </div>
        </div>
      </section>
      <section className="panel asset-browser">
        <div className="browser-toolbar">
          <div>
            <h2>人気の銘柄</h2>
            <p className="panel-description">マーケットで注目されている銘柄</p>
          </div>
          <label className="asset-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="銘柄名・コードで検索"
              aria-label="銘柄名・コードで検索"
            />
          </label>
        </div>
        <div className="filter-row">
          <div className="filter-tabs">
            {["すべて", "日本株", "米国株"].map((x) => (
              <button
                className={market === x ? "filter-active" : ""}
                key={x}
                onClick={() => setMarket(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <span className="result-count">{filtered.length} 銘柄</span>
        </div>
        <div className="asset-table">
          <div className="asset-table-head">
            <span>銘柄</span>
            <span>価格</span>
            <span>前日比</span>
            <span>カテゴリ</span>
            <span />
          </div>
          {filtered.map((x) => (
            <div className="asset-row" key={x.symbol}>
              <span className="asset-name-cell">
                <span className={`ticker-icon ${x.tone}`}>{x.brand}</span>
                <span>
                  <strong>{x.name}</strong>
                  <small>
                    {x.symbol} <i>·</i> {x.market}
                  </small>
                </span>
              </span>
              <strong className="asset-price">{x.price}</strong>
              <span
                className={`asset-change ${x.up ? "positive" : "negative"}`}
              >
                {x.up ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}{" "}
                {x.change}
              </span>
              <span className="asset-category">{x.category}</span>
              <button
                className={`watch-button ${watch.includes(x.symbol) ? "watch-on" : ""}`}
                aria-label={`${x.name}をウォッチリスト${watch.includes(x.symbol) ? "から削除" : "に追加"}`}
                onClick={() =>
                  setWatch((prev) =>
                    prev.includes(x.symbol)
                      ? prev.filter((v) => v !== x.symbol)
                      : [...prev, x.symbol],
                  )
                }
              >
                <Star
                  size={16}
                  fill={watch.includes(x.symbol) ? "currentColor" : "none"}
                />
              </button>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-filter">
            該当する銘柄が見つかりませんでした。
          </div>
        )}
        <div className="browser-footer">
          <span>表示中の価格はシミュレーション用のサンプルデータです。</span>
          <button>
            もっと見る <ChevronRight size={15} />
          </button>
        </div>
      </section>
      <div className="watchlist-tip">
        <span className="tip-icon">
          <TrendingUp size={17} />
        </span>
        <span>
          <strong>気になる銘柄を保存</strong>
          <small>
            星マークを押すとウォッチリストに追加できます。売買機能はまだ準備中です。
          </small>
        </span>
      </div>
    </div>
  );
}

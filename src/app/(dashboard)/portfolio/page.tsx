import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Download,
  MoreHorizontal,
} from "lucide-react";
const positions = [
  {
    name: "トヨタ自動車",
    code: "7203",
    shares: "400 株",
    avg: "¥2,540",
    price: "¥2,846",
    value: "¥1,138,400",
    pnl: "+¥122,400",
    up: true,
    color: "toyota",
    icon: "T",
  },
  {
    name: "Apple Inc.",
    code: "AAPL",
    shares: "30 株",
    avg: "$248.20",
    price: "$273.62",
    value: "$8,208.60",
    pnl: "+$762.60",
    up: true,
    color: "apple",
    icon: "●",
  },
  {
    name: "三菱UFJ FG",
    code: "8306",
    shares: "500 株",
    avg: "¥1,820",
    price: "¥1,782.5",
    value: "¥891,250",
    pnl: "−¥18,750",
    up: false,
    color: "mufg",
    icon: "M",
  },
  {
    name: "NVIDIA Corporation",
    code: "NVDA",
    shares: "28 株",
    avg: "$155.10",
    price: "$182.41",
    value: "$5,107.48",
    pnl: "+$764.68",
    up: true,
    color: "nvidia",
    icon: "N",
  },
  {
    name: "ソニーグループ",
    code: "6758",
    shares: "200 株",
    avg: "¥3,080",
    price: "¥3,412",
    value: "¥682,400",
    pnl: "+¥66,400",
    up: true,
    color: "sony",
    icon: "S",
  },
];
export default function PortfolioPage() {
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR INVESTMENTS
          </div>
          <h1>ポートフォリオ</h1>
          <p className="page-subtitle">
            保有資産の構成とパフォーマンスを確認できます。
          </p>
        </div>
        <button className="button button-secondary">
          <Download size={16} />
          レポートを準備中
        </button>
      </div>
      <div className="portfolio-overview">
        <div className="portfolio-value-card">
          <span className="card-label">ポートフォリオ総額</span>
          <strong>¥12,486,320</strong>
          <span className="trend positive">
            <ArrowUpRight size={15} />
            +¥1,248,620（+11.12%）
          </span>
          <small>取得金額 ¥11,237,700</small>
        </div>
        <div className="allocation-card">
          <div className="allocation-title">
            <strong>資産配分</strong>
            <button className="quiet-icon" aria-label="資産配分メニュー">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="allocation-content">
            <div className="donut-chart">
              <div>
                <strong>12</strong>
                <small>銘柄</small>
              </div>
            </div>
            <div className="allocation-legend">
              <span>
                <i className="legend-jp" />
                日本株 <b>67%</b>
              </span>
              <span>
                <i className="legend-us" />
                米国株 <b>33%</b>
              </span>
            </div>
          </div>
        </div>
        <div className="allocation-card performance-card">
          <strong>今月のパフォーマンス</strong>
          <span className="performance-value">+3.82%</span>
          <span className="trend positive">
            <ArrowUpRight size={14} />
            先月比 +¥428,600
          </span>
          <div className="performance-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="mini-foot">
            <span>11/01</span>
            <span>11/10</span>
          </div>
        </div>
      </div>
      <section className="panel positions-panel">
        <div className="panel-heading">
          <div>
            <h2>
              保有ポジション <span className="heading-count">12</span>
            </h2>
            <p className="panel-description">シミュレーション中の保有銘柄</p>
          </div>
          <button className="sort-button">
            評価額順 <span>⌄</span>
          </button>
        </div>
        <div className="positions-table">
          <div className="positions-head">
            <span>銘柄</span>
            <span>保有数量</span>
            <span>現在値</span>
            <span>評価額</span>
            <span>評価損益</span>
            <span />
          </div>
          {positions.map((x) => (
            <div className="position-row" key={x.code}>
              <Link href={`/assets?symbol=${x.code}`} className="position-name">
                <span className={`ticker-icon ${x.color}`}>{x.icon}</span>
                <span>
                  <strong>{x.name}</strong>
                  <small>{x.code}</small>
                </span>
              </Link>
              <span className="position-shares">
                {x.shares}
                <small>平均 {x.avg}</small>
              </span>
              <strong>{x.price}</strong>
              <strong>{x.value}</strong>
              <span
                className={`position-pnl ${x.up ? "positive" : "negative"}`}
              >
                {x.up ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {x.pnl}
              </span>
              <button className="quiet-icon" aria-label={`${x.name}の詳細`}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="positions-bottom">
          <span>全12銘柄のうち5銘柄を表示</span>
          <Link href="/assets">
            銘柄を探す <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <p className="page-disclaimer">
        表示されている数値はすべてシミュレーション用のサンプルデータです。
      </p>
    </div>
  );
}

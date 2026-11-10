# InvestLab

日本株・米国株の仮想投資シミュレーションを行うWebアプリの初期開発環境です。現在は環境構築のみで、認証、口座、銘柄、注文、約定などの業務機能と業務テーブルは含みません。実際の証券注文は行いません。

## 技術構成

- Next.js 16 App Router、React 19、TypeScript strict
- Tailwind CSS 4、shadcn/ui の設定（New York / CSS variables）
- PostgreSQL 16、node-postgres (`pg`)
- Docker Compose、Vitest、Playwright

## 必要条件

Node.js 20.9以上、npm、Docker Compose v2。

## 起動

```sh
cp .env.example .env
# .env の POSTGRES_PASSWORD と DATABASE_URL のパスワードを同じ値に変更
 docker compose up -d
npm install
npm run dev
```

Webアプリは http://localhost:3000 、ヘルス確認は http://localhost:3000/api/health です。PostgreSQLは localhost:5432 で待ち受け、名前付きVolume `investlab-postgres-data` にデータを保持します。停止は `docker compose down`、データを含めて削除する場合のみ `docker compose down -v` を使います。

## DB接続確認

```sh
docker compose ps
# healthy になるまで待つ
docker compose exec postgres pg_isready -U investlab -d investlab
docker compose exec postgres psql -U investlab -d investlab -c 'SELECT current_database(), now();'
```

アプリ側は `DATABASE_URL` を読み込みます。`src/server/db/pool.ts` はサーバー専用の遅延 Pool を提供し、`src/server/db/transaction.ts` の `withTransaction` は BEGIN/COMMIT/ROLLBACK と client release をまとめます。SQLは将来 Repository 層に置き、Service 層から利用してください。

## チェック

```sh
npm run lint
npm run typecheck
npm test
npm run test:integration
npx playwright install chromium # 初回のみ
npm run test:e2e
npm run build
```

単体テストは実DBに接続しません。DB統合テストは `DATABASE_URL` が設定されたときだけ実行されます。E2Eは開発サーバーを起動します。

## ディレクトリ責務

- `src/app`: App RouterのページとRoute Handlers
- `src/components`: 共通UI、レイアウト、チャート
- `src/features`: 将来の機能単位のUI・ロジック
- `src/server/db`: サーバー専用DB接続とトランザクション
- `src/server/repositories`: SQLアクセスの集約先
- `src/server/services`: ビジネスロジックの配置先
- `src/lib`, `src/types`: クライアントでも安全な共有処理・型
- `database`: 将来のschema/migration/seed配置先（現時点で業務DDLなし）
- `tests`: unit、integration、e2e
- `docker/postgres/init`: 初回DB初期化用SQLの配置先

## shadcn/ui

`components.json` と `src/lib/utils/cn.ts` を設定済みです。コンポーネントは必要になった段階で `npx shadcn@latest add <component>` で追加できます。Tailwind 4構成なので、生成結果を確認してから取り込んでください。

## 注意点と次の作業

- `.env` と接続文字列はコミットせず、クライアントコードや `NEXT_PUBLIC_*` に公開しないでください。
- PostgreSQLのinit SQLはデータVolumeの初回作成時だけ動作します。既存Volumeには自動適用されません。
- 次は業務要件を確定し、認証・仮想口座の設計と、それに必要な範囲のschema migrationをレビュー可能な形で作るのがおすすめです。

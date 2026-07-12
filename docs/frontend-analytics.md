# フロントエンドイベント設計

フロントエンドイベントは `POST /events` に送信します。開発環境では外部送信せず、ブラウザのコンソールにリクエスト本文を出力します。

## 共通プロパティ

すべてのイベントの `properties` に以下を自動付与します。

| プロパティ | 定義 |
| --- | --- |
| `analytics_schema_version` | イベント共通スキーマのバージョン。現在は `1` |
| `anonymous_id` | ブラウザのlocalStorageに保存する匿名ID |
| `session_id` | タブ単位のセッションID。最後のイベントから30分経過後に更新 |
| `is_session_start` | そのセッションで最初に送信したイベントか |
| `client_event_id` | クライアントで生成したイベントID。再送・重複調査に使用 |
| `client_event_at` | ブラウザでイベントが発生したISO 8601時刻 |

`user_id` は認証済みの場合にAuth0のsubject、匿名の場合に空文字を送ります。`anonymous_id` はログイン前後で変わらないため、匿名状態から認証後までの導線を接続できます。

## イベント

| イベント | 発火条件 | 主な固有プロパティ |
| --- | --- | --- |
| `page_view` | 初回表示およびNext.jsのパス遷移 | `page_title`, `previous_path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign` |
| `login_started` | サインインリンクのクリック | `source` |
| `login_succeeded` | 当サイトから開始したAuth0認証から1時間以内に復帰 | `source`, `return_path`, `login_started_at`, `login_duration_ms` |
| `search_performed` | 検索APIの成功または失敗 | `query`, `result_count`, 種別ごとの件数, `status`, `response_time_ms` |
| `search_result_clicked` | 検索結果を選択 | `query`, `result_id`, `result_type`, `result_url`, `result_rank` |
| `quiz_started` | クイズの回答フォームを表示 | `quiz_id`, `answer_count`, `option_count` |
| `quiz_completed` | 回答判定APIが正常に応答 | `quiz_id`, `is_correct`, `attempt_number`, `selected_option_count`, `response_time_ms` |

既存の `sidebar_link_click`、`click_login_dialog_button`、`reference_link_click` も継続し、同じ共通プロパティを持ちます。

## 分析時の定義

- セッション数: `session_id` のユニーク数
- 匿名利用者数: `anonymous_id` のユニーク数。端末・ブラウザをまたぐ人物数ではない
- ページ遷移: 同じ `session_id` 内の `page_view` を `client_event_at` 順に並べる
- ログインCVR: `login_succeeded` 数 / `login_started` 数。`source` 別にも集計する
- 検索結果CTR: `search_result_clicked` 数 / 成功した `search_performed` 数
- クイズ完了率: `quiz_completed` がある `anonymous_id + quiz_id` 数 / `quiz_started` がある同組み合わせ数
- 初回正答率: `attempt_number = 1` の `quiz_completed` における `is_correct = true` の比率

イベント到着時刻ではなく、ユーザー操作の順序や所要時間には `client_event_at` を使います。クライアント時計のずれがあり得るため、日次集計などの境界ではサーバー到着時刻と併用してください。

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { ZoomableImage } from "@/components/ui/image-zoom"
import { ExternalLinkIcon, CheckCircleIcon, ListOrderedIcon } from "lucide-react"

// サンプルデータのベースURL
const BASE_URL = "https://datatech-learning-place.net";


export default function TextContents() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Chapter 2: Snowflake環境のセットアップ</h1>

      <p className="mb-4">
        この章では、データパイプラインの中核となるデータウェアハウス「Snowflake」のセットアップを行います。
        無料トライアルアカウントを作成し、基本的な操作に慣れていきましょう。
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">主な学習内容</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Snowflake無料トライアルアカウントの作成</li>
          <li>Snowsight (新UI) の基本操作</li>
          <li>データベース、スキーマ、ウェアハウスの作成</li>
          <li>サンプルデータのロードとクエリ実行</li>
        </ul>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-6">
        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">Snowflakeとは？</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
          Snowflakeは、クラウドネイティブに設計されたSaaS型のデータウェアハウスです。
          コンピューティングとストレージが分離しており、高いスケーラビリティと柔軟性を誇ります。
          SQLで操作できるため、多くのエンジニアやアナリストにとって学習コストが低いのが特徴です。
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. アカウント作成</h3>
        <p className="mb-3">
          まずは公式サイトから30日間の無料トライアルにサインアップします。
          クレジットカードの登録は不要です。
        </p>
        <a
          href="https://signup.snowflake.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Snowflake 無料トライアル <ExternalLinkIcon className="h-4 w-4" />
        </a>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          プラットフォームは「AWS」、リージョンは「Asia Pacific (Tokyo)」を選択することをおすすめします。<br />
          また、セキュリティやガバナンス系の機能の検証もできるようにするため、「Enterprise Edition」を選択しましょう。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2. Snowsightの確認</h3>
        <p className="mb-3">
          アカウント作成後、Snowsightと呼ばれる新しいWebインターフェースにログインします。
          左側のメニューから「Projects」 &gt; 「Worksheets」を開き、右上の + ボタンから新しいSQLワークシートを追加してみましょう。
        </p>
        <CodeBlock
          code={`-- 現在のウェアハウス、DB、スキーマの確認
SELECT CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();`}
          title="初期確認クエリ"
          showLineNumbers={true}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3. 基本的な環境設定</h3>
        <p className="mb-3">
          まずはロールとウェアハウスを設定し、作業用のデータベースとスキーマを作成します。
        </p>
        <CodeBlock
          code={`-- ロールの設定（SYSADMIN権限を使用）
USE ROLE SYSADMIN;

-- ウェアハウスの作成
CREATE WAREHOUSE IF NOT EXISTS TUTORIAL_WH
WAREHOUSE_SIZE = 'X-SMALL'
AUTO_SUSPEND = 60
INITIALLY_SUSPENDED = TRUE;

-- ウェアハウスの設定
USE WAREHOUSE TUTORIAL_WH;

-- 作業用データベースの作成
CREATE DATABASE IF NOT EXISTS TUTORIAL_DB;
USE DATABASE TUTORIAL_DB;

-- スキーマの作成
CREATE SCHEMA IF NOT EXISTS SAMPLE_SCHEMA;
USE SCHEMA SAMPLE_SCHEMA;`}
          title="基本環境設定"
          showLineNumbers={true}
        />
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          use roleやuse warehouseは、createコマンドを実行したタイミングで自動で設定されますが、訓練も兼ねて実行してもらいました。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">4. サンプルテーブルの作成</h3>
        <p className="mb-3">
          従業員データを格納するテーブルを作成します。
        </p>
        <CodeBlock
          code={`-- 従業員テーブルの作成
CREATE OR REPLACE TABLE employees (
    id INTEGER,
    name STRING,
    department STRING,
    salary INTEGER,
    hire_date DATE
);

-- テーブル構造の確認
DESCRIBE TABLE employees;`}
          title="テーブル作成"
          showLineNumbers={true}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">5. CSVファイルのアップロードとデータロード</h3>
        <p className="mb-3">
          サンプルCSVファイルをダウンロードして、Snowflakeの内部ステージにアップロードし、データをロードします。
        </p>
        
        <div className="mb-4">
                      <a
              href={`${BASE_URL}/sample_data/pipeline/sample_employees.csv`}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
            📁 サンプルCSVをダウンロード
          </a>
        </div>

        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">内部ステージ作成とファイルアップロード手順</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. 上記のCSVファイルをダウンロード<br/>
            2. Snowsightの左下のユーザのアイコンなどがある部分をクリックしてSwitch Roleで「SYSADMIN」を選択<br/>
            3. Snowsightの左メニューから「Data」 &gt; 「Databases」を選択<br/>
            4. TUTORIAL_DB &gt; SAMPLE_SCHEMA を開く<br/>
            5. 「Create」ボタン &gt; 「Stage」 &gt; 「Snowflake Managed」を選択<br/>
            6. Stage名を「my_stage」、Encriptionは「Server-side encryption」を選択して作成<br/>
            7. 作成したステージを選択し、「+ Files」ボタンをクリック<br/>
            8. ダウンロードしたCSVファイルをBrowseで選択してアップロード
          </AlertDescription>
        </Alert>

        <ZoomableImage
          src={`${BASE_URL}/image/text/pipeline/02_create_stage.png`}
          alt="ステージ作成"
          width={500}
          caption="図1: Snowflakeでの内部ステージ作成画面"
        />

        <p className="mb-3">
          ステージにファイルをアップロード後、以下のSQLコマンドでデータをロードします：
        </p>
        
        <CodeBlock
          code={`-- ステージ内のファイルを確認
LIST @my_stage;

-- CSVファイルからデータをロード
COPY INTO employees
FROM @my_stage/sample_employees.csv
FILE_FORMAT = (
    TYPE = 'CSV'
    FIELD_DELIMITER = ','
    RECORD_DELIMITER = '\\n'
    SKIP_HEADER = 1
    FIELD_OPTIONALLY_ENCLOSED_BY = '"'
);

-- データが正しくロードされたか確認
SELECT * FROM employees;
SELECT COUNT(*) FROM employees;`}
          title="データロード"
          showLineNumbers={true}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">6. 基本的なクエリの実行</h3>
        <p className="mb-3">
          ロードしたデータに対して基本的な分析クエリを実行してみましょう。
        </p>
        <CodeBlock
          code={`-- 部署別の平均給与
SELECT 
    department,
    ROUND(AVG(salary), 0) as avg_salary,
    COUNT(*) as employee_count
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- 入社年別の従業員数
SELECT 
    YEAR(hire_date) as hire_year,
    COUNT(*) as employee_count
FROM employees
GROUP BY YEAR(hire_date)
ORDER BY hire_year;

-- 給与の高い順に従業員を表示
SELECT name, department, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;`}
          title="分析クエリ例"
          showLineNumbers={true}
          maxLines={22}
        />
        
        <p className="mt-4">
          これでSnowflakeの基本的なセットアップとデータロードが完了しました。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">7. リソースの削除</h3>
        <p className="mb-3">
          作業完了後は、不要なリソースを削除してクリーンアップしましょう。
        </p>
        <CodeBlock
          code={`-- データベースの削除
DROP DATABASE IF EXISTS TUTORIAL_DB;

-- dbt関連リソースの削除
DROP DATABASE IF EXISTS dbt_tutorial;`}
          title="リソース削除"
          showLineNumbers={true}
        />
        
        <p className="mt-4">
          次章では、このSnowflake環境にdbtから接続し、最初のデータモデルを構築していきます。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">8. dbt接続用ユーザーとキーペア認証の設定</h3>
        <p className="mb-3">
          次章でのdbt接続に備えて、専用のdbtユーザーを作成し、セキュアなキーペア認証を設定します。
          パスワード認証よりも安全で、自動化にも適した認証方式です。
        </p>
        
        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">キーペア認証のメリット</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. <strong>セキュリティ</strong>: パスワードよりも強固な認証<br/>
            2. <strong>自動化対応</strong>: CI/CDパイプラインでの利用に最適<br/>
            3. <strong>ローテーション</strong>: 定期的なキー更新が容易<br/>
            4. <strong>監査</strong>: アクセスログの追跡が明確
          </AlertDescription>
        </Alert>

        <h4 className="text-md font-semibold mb-2">手順1: dbt専用ユーザーとロールの作成</h4>
        
        <CodeBlock
          code={`-- Step 1: USERADMINロールでユーザーとロールを作成
USE ROLE USERADMIN;

-- 1. dbt専用ロールを作成
CREATE ROLE IF NOT EXISTS dbt_role
  COMMENT = 'Role for dbt operations';

-- 2. sysadminロールを親ロールに設定
GRANT ROLE dbt_role to ROLE SYSADMIN;

-- 3. dbt専用ユーザーを作成（キーペア認証専用）
CREATE USER IF NOT EXISTS dbt_user
  PASSWORD = NULL  -- パスワード認証を無効化
  COMMENT = 'dbt development user'
  DEFAULT_WAREHOUSE = 'dbt_wh'
  DEFAULT_ROLE = 'dbt_role';

-- 4. ロールにユーザーを割り当て
GRANT ROLE dbt_role TO USER dbt_user;

-- Step 2: SYSADMINロールでデータベースとウェアハウスを作成・権限付与
USE ROLE SYSADMIN;

-- 4. dbt専用ウェアハウスを作成
CREATE WAREHOUSE IF NOT EXISTS dbt_wh
WAREHOUSE_SIZE = 'X-SMALL'
AUTO_SUSPEND = 60
INITIALLY_SUSPENDED = TRUE
COMMENT = 'Warehouse for dbt operations';

-- 5. dbt開発用データベースを作成
CREATE DATABASE IF NOT EXISTS dbt_tutorial
  COMMENT = 'Database for dbt tutorial';

-- 6. ロールに必要な権限を付与
-- データベースの使用権限
GRANT USAGE ON DATABASE dbt_tutorial TO ROLE dbt_role;
GRANT CREATE SCHEMA ON DATABASE dbt_tutorial TO ROLE dbt_role;

-- ウェアハウスの使用権限
GRANT USAGE ON WAREHOUSE dbt_wh TO ROLE dbt_role;`}
          title="dbtユーザー・ロール作成"
          showLineNumbers={true}
          maxLines={45}
        />

        <Alert className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 mt-4 mb-4">
          <CheckCircleIcon className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-200">Snowflakeロール分離のベストプラクティス</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300 leading-loose">
            <strong>USERADMIN</strong>: ユーザーとロールの管理を担当<br/>
            <strong>SYSADMIN</strong>: データベース、スキーマ、ウェアハウスの管理を担当<br/>
            この分離により、責任の明確化とセキュリティの向上を図れます。<br/>
            キーペア認証の詳細設定は、次章の開発環境構築後に行います。
          </AlertDescription>
        </Alert>

        <h4 className="text-md font-semibold mb-2">手順2: 権限とアクセス確認</h4>
        
        <CodeBlock
          code={`-- Step 3: 作成したユーザーとロールの確認
-- USERADMINロールで確認
USE ROLE USERADMIN;
SHOW USERS LIKE 'dbt_user';
SHOW ROLES LIKE 'dbt_role';

DESC USER dbt_user;

-- SYSADMINロールで権限確認
USE ROLE SYSADMIN;
SHOW GRANTS TO ROLE dbt_role;
SHOW GRANTS TO USER dbt_user;

-- Step 4: dbt_userでのログインテスト
-- ※キーペア認証設定後に新しいワークシートまたはセッションで以下を実行
USE ROLE dbt_role;
USE WAREHOUSE dbt_wh;
USE DATABASE dbt_tutorial;

-- 基本的な操作が可能か確認
SELECT CURRENT_USER(), CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE();

-- スキーマ作成権限の確認
CREATE SCHEMA IF NOT EXISTS dbt_tutorial.dbt_test;

-- テーブル作成権限の確認
CREATE OR REPLACE TABLE test_dbt_access (
    id INTEGER,
    test_message STRING
);

INSERT INTO test_dbt_access VALUES (1, 'dbt access test successful');
SELECT * FROM test_dbt_access;

-- テストスキーマを削除
DROP SCHEMA dbt_tutorial.dbt_test;`}
          title="権限確認とアクセステスト"
          showLineNumbers={true}
          maxLines={40}
        />

        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">Snowflake設定完了の確認項目</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            以下の項目がすべて完了していることを確認してください：<br/>
            ✓ dbt_userとdbt_roleの作成<br/>
            ✓ dbt_tutorialデータベースの作成<br/>
            ✓ 必要な権限の付与（USAGE、CREATE SCHEMA、FUTURE権限など）<br/>
            ✓ dbt_userでのアクセステスト成功<br/>
            ✓ テーブル作成・操作権限の確認<br/>
            次章では、Devcontainer環境でRSAキーペアを生成し、キーペア認証を設定します。
          </AlertDescription>
        </Alert>
        
        <p className="mt-4">
          これでSnowflake側のdbt接続準備が完了しました。<br/>
          次章では、Mac環境でDevcontainerをセットアップし、キーペア認証を設定してdbt開発環境を構築します。
        </p>
      </div>

      {/* ページネーション */}
      <div className="mt-8 flex justify-between items-center">
        <div className="w-1/3">
          <a href="/text/pipeline/01" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Back
          </a>
        </div>
        <div className="w-1/3 text-center">
          <a href="/text/pipeline" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
            Top
          </a>
        </div>
        <div className="w-1/3 text-right">
          <a href="/text/pipeline/03" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Next
          </a>
        </div>
      </div>
    </div>
  );
}
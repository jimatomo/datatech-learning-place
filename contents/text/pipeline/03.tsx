import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "@/components/ui/code-block"
import { ExternalLinkIcon, CheckCircleIcon, ListOrderedIcon, TerminalIcon, DownloadIcon } from "lucide-react"


export default function TextContents() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Chapter 3: ローカル開発環境のセットアップ（Mac編）</h1>

      <p className="mb-4">
        この章では、Mac環境でdbtを使用したデータパイプライン開発のためのローカル開発環境をセットアップします。
        Gitからコンテナ化された開発環境まで、一連のツールチェーンを構築していきます。
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">主な学習内容</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Gitのインストール（コマンドラインディベロッパーツール）</li>
          <li>Rancher Desktopのインストールと設定</li>
          <li>Visual Studio Codeのインストール</li>
          <li>Dev Containers拡張機能の追加</li>
          <li>GitHubリポジトリのクローン</li>
          <li>Devcontainerの設定ファイル作成</li>
          <li>dbt開発用のDevcontainer環境構築</li>
        </ul>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-6">
        <CheckCircleIcon className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">Dev Containersとは？</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
          Dev Containersは、開発環境をコンテナ化して一貫性のある開発体験を提供する技術です。
          チーム全体で同じ開発環境を共有でき、「私の環境では動く」問題を解決できます。
          dbtのようなPythonベースのツールでは、依存関係の管理が重要なため特に有効です。
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">1. Gitのセットアップ（コマンドラインディベロッパーツール）</h3>
        <p className="mb-3">
          gitの設定をします。インストールされていない場合は、X-Codeをインストールするなどしてください。
        </p>

        <CodeBlock
          code={`# gitコマンドが使えるか確認（MacのデフォルトでOK）
git --version

# 初回設定（自分の情報に置き換えてください）
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"`}
          title="Gitインストールとセットアップ"
          showLineNumbers={true}
        />
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md">git --version</code> でバージョンが表示されれば、Gitは正常にインストールされています。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">2. Rancher Desktopのインストール</h3>
        <p className="mb-3">
          Rancher DesktopはDockerの代替となるコンテナランタイムです。
          Docker Desktopと比較して、商用利用でも無料で使用できるのが特徴です。
        </p>
        
        <div className="mb-4">
          <a
            href="https://rancherdesktop.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <DownloadIcon className="h-4 w-4" />
            Rancher Desktop公式サイト <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>

        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">インストール手順</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. 上記リンクから公式サイトにアクセス<br/>
            2. 「Download for macOS」をクリック<br/>
            3. ダウンロードした.dmgファイルを開く<br/>
            4. Rancher Desktop.appをApplicationsフォルダにドラッグ&ドロップ<br/>
            5. アプリケーションを起動し、初期設定を完了<br/>
            6. Container Engineは「dockerd (moby)」を選択することを推奨
          </AlertDescription>
        </Alert>

        <CodeBlock
          code={`# インストール後、Dockerコマンドが使用できることを確認
docker --version`}
          title="インストール確認"
          showLineNumbers={true}
        />
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          初回起動時は、コンテナランタイムの初期化に数分かかる場合があります。<br/>
          Kubernetesは今回は使用しないため、無効にしておいても問題ありません。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">3. Visual Studio Codeのインストール</h3>
        <p className="mb-3">
          VSCodeは無料で使用できる高機能なコードエディタです。
          豊富な拡張機能により、dbt開発に最適な環境を構築できます。
        </p>
        
        <div className="mb-4">
          <a
            href="https://code.visualstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DownloadIcon className="h-4 w-4" />
            Visual Studio Code公式サイト <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>

        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">インストール手順</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. 上記リンクから公式サイトにアクセス<br/>
            2. 「Download for macOS」をクリック<br/>
            3. ダウンロードした.zipファイルを解凍<br/>
            4. Visual Studio Code.appをApplicationsフォルダに移動<br/>
            5. アプリケーションを起動<br/>
            6. 初回起動時にコマンドラインから使用するための設定を行う
          </AlertDescription>
        </Alert>

        <CodeBlock
          code={`# VSCodeをコマンドラインから起動できるようにする
# VSCode起動後、Command Palette (Cmd+Shift+P) を開き
# "Shell Command: Install 'code' command in PATH" を実行

# インストール後、ターミナルからVSCodeを起動できることを確認
code --version

# カレントディレクトリをVSCodeで開く
code .`}
          title="コマンドライン設定"
          showLineNumbers={true}
        />
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          コマンドラインからの起動設定により、ターミナルから直接プロジェクトフォルダを開けるようになります。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">4. Dev Containers拡張機能の追加</h3>
        <p className="mb-3">
          Dev Containers拡張機能により、VSCode内でコンテナベースの開発環境を利用できるようになります。
          この拡張機能により、dbtプロジェクトを一貫した環境で開発できます。
        </p>
        
        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">拡張機能インストール手順</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. VSCodeを起動<br/>
            2. 左側のサイドバーから拡張機能アイコン（四角いアイコン）をクリック<br/>
            3. 検索ボックスに「Dev Containers」と入力<br/>
            4. Microsoft公式の「Dev Containers」拡張機能を選択<br/>
            5. 「インストール」ボタンをクリック<br/>
            6. インストール完了後、VSCodeを再起動
          </AlertDescription>
        </Alert>

        <div className="mb-4">
          <a
            href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Dev Containers拡張機能 <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>

        <CodeBlock
          code={`# 拡張機能がインストールされていることを確認
# VSCodeのCommand Palette (Cmd+Shift+P) で以下のコマンドが利用可能になる：

# Dev Containers: Open Folder in Container ...
# Dev Containers: Rebuild Container
# Dev Containers: Add Dev Container Configuration Files...`}
          title="インストール確認"
          showLineNumbers={true}
        />
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          この拡張機能により、プロジェクトフォルダ内の.devcontainer設定を自動で認識し、<br/>
          コンテナ内での開発環境を提供してくれます。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">5. GitHubリポジトリのクローン</h3>
        <p className="mb-3">
          dbtプロジェクトを管理するためのGitHubリポジトリを作成し、ローカル環境にクローンします。
          ここでは新規リポジトリの作成から既存リポジトリのクローンまでの手順を説明します。
        </p>
        
        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mb-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">新規リポジトリ作成の場合</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            1. GitHub.comにログイン<br/>
            2. 右上の「+」ボタン → 「New repository」を選択<br/>
            3. Repository name: 「dbt-tutorial」（任意の名前）<br/>
            4. 「Add a README file」にチェック<br/>
            5. 「Create repository」をクリック
          </AlertDescription>
        </Alert>

        <CodeBlock
          code={`# 作業用ディレクトリを作成して移動（任意の場所に作成してください）
mkdir ~/dev
cd ~/dev

# GitHubリポジトリをクローン（URLは自分のリポジトリに置き換え）
git clone https://github.com/your-username/dbt-tutorial.git
cd dbt-tutorial

# クローンが成功したことを確認
ls -la
git status`}
          title="リポジトリクローン"
          showLineNumbers={true}
        />

        <Alert className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 mt-4">
          <TerminalIcon className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-200">既存リポジトリを使用する場合</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300 leading-loose">
            既にdbtプロジェクトのリポジトリがある場合は、そのリポジトリをクローンしてください。<br/>
            プライベートリポジトリの場合は、SSH鍵の設定やPersonal Access Tokenが必要になる場合があります。
          </AlertDescription>
        </Alert>
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          クローンしたディレクトリが、次のステップでのdevcontainer設定の作業ディレクトリになります。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">6. Devcontainer設定ファイルの作成</h3>
        <p className="mb-3">
          dbt開発用のDevcontainer環境を構築するため、設定ファイルを作成します。
          これにより、チーム全体で一貫したPython・dbt環境を共有できます。
        </p>
        
        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">Devcontainer設定手順</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. プロジェクトルートに.devcontainerディレクトリを作成<br/>
            2. devcontainer.jsonファイルを作成<br/>
            3. Dockerfileまたは既存イメージを設定<br/>
            4. VSCodeでプロジェクトを開き、Command Palette (Cmd+Shift+P) から「Dev Containers: Open Folder in Container ...」を実行すると環境に入れる
          </AlertDescription>
        </Alert>

        <CodeBlock
          code={`# プロジェクトディレクトリで.devcontainerフォルダを作成
mkdir .devcontainer

# 設定ファイルを作成
touch .devcontainer/devcontainer.json
touch .devcontainer/Dockerfile
touch .devcontainer/docker-compose.yml
touch .devcontainer/requirements.txt`}
          title="ディレクトリ作成"
          showLineNumbers={true}
        />

        <p className="m-3">
          まず、<code>.devcontainer/requirements.txt</code>を作成します：
        </p>

        <CodeBlock
          code={`# dbt関連パッケージ（従来版）
dbt-core==1.10.9
dbt-snowflake==1.10.0

# SQLリンター
sqlfluff==3.4.2

# Pythonリンター
flake8==7.1.1`}
          title=".devcontainer/requirements.txt"
          showLineNumbers={true}
        />

        <p className="mt-1 mb-3 text-sm text-gray-600 dark:text-gray-400">
          注意: dbt-fusionはCLIとして別途Dockerfile内でインストールします
          これにより、dbt（従来版）とdbtf（Fusion版）の両方が使用可能になります
        </p>

        <p className="mb-3">
          次に、<code>.devcontainer/Dockerfile</code>を作成します：
        </p>

        <CodeBlock
          code={`FROM python:3.12-slim-bookworm

# 作業ディレクトリを設定
WORKDIR /workspace

# システムパッケージを更新し、必要なツールをインストール
RUN apt-get update \
&& apt-get install -y  --no-install-recommends git zsh curl unzip ca-certificates \
&& apt-get -y clean \
&& rm -rf /var/lib/apt/lists/*

# pipを最新版にアップグレード
RUN pip install --upgrade pip

# requirements.txtをコピーして依存関係をインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ユーザーを作成（セキュリティのため）
RUN useradd -m -s /bin/bash dbtuser
USER dbtuser

# Install Oh My zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \\
# zsh-completions
&& git clone https://github.com/zsh-users/zsh-completions \${ZSH_CUSTOM:-\${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions \\
# zsh-autosuggestions
&& git clone https://github.com/zsh-users/zsh-autosuggestions \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \\
# plugin setting
&& sed -i -e 's/plugins=(git)/plugins=(git zsh-completions zsh-autosuggestions)/g' ~/.zshrc

# dbt-fusionのCLIをインストール
RUN curl -fsSL https://public.cdn.getdbt.com/fs/install/install.sh | sh -s -- --update

# dbtとdbtfのエイリアスを設定する
RUN echo "alias dbt='/usr/local/bin/dbt'" >\> ~/.zshrc \\
&& echo "alias dbtf='/home/dbtuser/.local/bin/dbt'" >\> ~/.zshrc`}
          title=".devcontainer/Dockerfile"
          showLineNumbers={true}
          maxLines={40}
        />

        <p className="m-3">
          次に、<code>.devcontainer/docker-compose.yml</code>を作成します：
        </p>

        <CodeBlock
          code={`services:
  dbt-dev:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: dbt-development
    volumes:
      # プロジェクトディレクトリをマウント
      - ../:/workspace:cached
      # dbt設定ディレクトリをマウント
      - ~/.dbt:/home/dbtuser/.dbt:cached
    ports:
      - "8080:8080"  # dbt docs serve用
    environment:
      - DBT_PROFILES_DIR=/home/dbtuser/.dbt
    env_file:
      # .envファイルから環境変数を読み込み
      - ~/.dbt/.env
    # コンテナを起動状態に保つ
    tty: true
    stdin_open: true`}
          title=".devcontainer/docker-compose.yml"
          showLineNumbers={true}
        />

        <p className="m-3">
          最後に、<code>.devcontainer/devcontainer.json</code>を作成します：
        </p>

        <CodeBlock
          code={`{
  "name": "dbt Dev",
  "dockerComposeFile": "docker-compose.yml",
  "service": "dbt-dev",
  "workspaceFolder": "/workspace",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-python.flake8",
        "dorzey.vscode-sqlfluff"
      ],
      "settings": {
        "sqlfluff.workingDirectory": "\${workspaceFolder}/dbt_tutorial",
        "sqlfluff.config": "\${workspaceFolder}/dbt_tutorial/.sqlfluff",
        "sqlfluff.linter.run": "onSave",
        "sqlfluff.experimental.format.executeInTerminal": true,
        "editor.formatOnSave": false,
        "python.defaultInterpreterPath": "/usr/local/bin/python",
        "python.linting.enabled": true,
        "python.linting.flake8Enabled": true,
        "python.linting.pylintEnabled": false
      }
    }
  },
  "remoteUser": "dbtuser"
}`}
          title=".devcontainer/devcontainer.json"
          showLineNumbers={true}
          maxLines={30}
        />

        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">各ファイルの役割と学習効果</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            <strong>requirements.txt</strong>: Python依存関係の管理。dbt-coreとdbt-snowflakeの最新版を管理。<br/>
            • dbt-core 1.10.9とdbt-snowflake 1.10.0、sqlfluff 3.4.2、flake8 7.1.1を管理<br/>
            • ビルド時にコンテナイメージに組み込まれ、一貫した環境を提供<br/>
            <strong>Dockerfile</strong>: コンテナイメージの構築手順を定義。dbt-fusionも追加インストール。<br/>
            • 従来のdbtとFusion版の両方をインストールし、比較学習が可能<br/>
            <strong>docker-compose.yml</strong>: サービスの設定とオーケストレーション。本格的な開発環境構築を学べます。<br/>
            • ボリュームマウント、ポートフォワーディング、環境変数など<br/>
            <strong>devcontainer.json</strong>: VSCode固有の設定のみ。IDEとの連携に特化。<br/>
            • dbt開発に必要な拡張機能、エディタ設定、リモートユーザーなど
          </AlertDescription>
        </Alert>

        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">なぜこの構成が優れているか</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. <strong>再利用性</strong>: DockerfileとCompose設定は他のプロジェクトでも使用可能<br/>
            2. <strong>一貫性</strong>: ビルド時に依存関係が固定され、環境の一貫性を保証<br/>
            3. <strong>学習効果</strong>: Dockerの基本概念から実践的な使い方まで体系的に学習<br/>
            4. <strong>拡張性</strong>: データベースや他のサービスを簡単に追加可能<br/>
            5. <strong>責任分離</strong>: 各ファイルが明確な役割を持ち、保守しやすい<br/>
            6. <strong>チーム開発</strong>: 一般的な構成のため、チームメンバーが理解しやすい
          </AlertDescription>
        </Alert>

        <Alert className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-200">dbt-coreとdbt-fusionの使い分け</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300 leading-loose">
            この環境では2つのdbtエンジンが使用可能です：<br/>
            <strong>dbt-core（従来版）</strong>: <code>dbt</code>コマンドで実行<br/>
            • 安定性重視、豊富なドキュメントと実績<br/>
            • dbt-core 1.10.9 + dbt-snowflake 1.10.0の組み合わせ<br/>
            <strong>dbt-fusion（次世代版）</strong>: <code>dbtf</code>コマンドで実行<br/>
            • パースが最大30倍、コンパイルが2倍高速<br/>
            • リアルタイム検証、ローカル実行が可能<br/>
            • Rustで再構築された高性能エンジン<br/>
            学習時は両方を試して、パフォーマンスの違いを体感できます。<br/>
            詳細: <a href="https://docs.getdbt.com/docs/fusion/install-fusion-cli" target="_blank" className="underline">dbt Fusion CLI インストールガイド</a>
          </AlertDescription>
        </Alert>
        
        <p className="mt-4">
          設定ファイル作成後、VSCodeでプロジェクトを開き直すとDevcontainer環境が利用可能になります。
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">7. Devcontainer環境の起動</h3>
        <p className="mb-3">
          設定ファイルを作成したら、実際にDevcontainer環境を起動してdbt開発環境を確認します。
        </p>
        
        <Alert className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400 mb-4">
          <ListOrderedIcon className="h-5 w-5 text-blue-600" />
          <AlertTitle className="font-bold text-blue-800 dark:text-blue-200">Devcontainer起動手順</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-300 leading-loose">
            1. VSCodeでプロジェクトフォルダを開く<br/>
            2. 右下に表示される通知「Reopen in Container」をクリック<br/>
            3. または Command Palette (Cmd+Shift+P) → 「Dev Containers: Reopen in Container」を実行<br/>
            4. コンテナのビルドと起動を待つ（初回は数分かかります）<br/>
            5. ターミナルでdbtがインストールされていることを確認
          </AlertDescription>
        </Alert>

        <CodeBlock
          code={`# Devcontainer環境内での動作確認

# dbt-core（従来版）の動作確認
dbt --version

# dbt-fusion（次世代版）の動作確認
dbtf --version

# SQL・Python開発支援ツールの確認
sqlfluff --version
flake8 --version

# 両方のdbtエンジンでプロジェクトの初期化を試す
# dbt-coreでの初期化（対話的なので情報を適切に入力していく。認証情報は後で修正するので適当でOK）
dbt init dbt_tutorial`}
          title="環境確認"
          showLineNumbers={true}
          maxLines={30}
        />

        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">環境構築完了！</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            これでMac環境でのdbt開発環境セットアップが完了しました。<br/>
            次章では、この環境を使用してSnowflakeに接続し、最初のdbtプロジェクトを作成していきます。
          </AlertDescription>
        </Alert>
        
        <p className="mt-4">
          Devcontainer環境により、チーム全体で一貫した開発環境を共有でき、<br/>
          「私の環境では動く」問題を解決できるようになりました。
        </p>
      </div>


      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">8. Snowflakeキーペア認証の完了設定</h3>
        <p className="mb-3">
          前章で作成したdbtユーザーに対して、Devcontainer環境からRSAキーペアを生成し、<br/>
          セキュアなキーペア認証を設定します。
        </p>
        
        <h4 className="text-md font-semibold mb-2">手順1: RSAキーペアの生成</h4>
        
        <CodeBlock
          code={`# Devcontainer環境内でキーペアを生成
# .dbt ディレクトリに作成する
cd ~/.dbt

# RSA秘密鍵を生成（2048ビット、PKCS#8形式、パスフレーズなし）
# Snowflake公式推奨の方法
openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt

# 公開鍵を生成
openssl rsa -in rsa_key.p8 -pubout -out rsa_key.pub

# 秘密鍵のパーミッションを設定（セキュリティ上重要）
chmod 600 rsa_key.p8

# ALTER USER用に公開鍵をクレンジング（BEGIN/END行と改行を除去）
grep -v -E '^-----' rsa_key.pub | tr -d '\\n' > rsa_key.pub.oneline

# 生成されたファイルを確認
ls -la rsa_key.*

# クレンジングされた公開鍵を確認（ALTER USER文用）
cat rsa_key.pub.oneline`}
          title="RSAキーペア生成"
          showLineNumbers={true}
          maxLines={30}
        />

        <Alert className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 mt-4 mb-4">
          <TerminalIcon className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-200">重要な注意事項</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300 leading-loose">
            <strong>秘密鍵の管理</strong>: rsa_key.p8は絶対に他人と共有しないでください<br/>
            <strong>バックアップ</strong>: 秘密鍵は安全な場所にバックアップを取ってください<br/>
            <strong>権限設定</strong>: chmod 600により所有者のみが読み取り可能に設定<br/>
            <strong>Gitの除外</strong>: .gitignoreに追加して誤ってコミットしないようにする
          </AlertDescription>
        </Alert>

        <h4 className="text-md font-semibold mb-2">手順2: 公開鍵をSnowflakeに登録</h4>
        
        <CodeBlock
          code={`-- 生成した公開鍵をSnowflakeユーザーに設定
use role useradmin;

-- クレンジングされた公開鍵の内容をコピーして以下のSQLを実行

-- クレンジングされた公開鍵の内容を確認（そのままコピー可能）
-- cat ~/.dbt/rsa_key.pub.oneline の出力をそのままコピー

-- SnowflakeのWebUIで以下のSQLを実行（上記の出力を貼り付け）
ALTER USER dbt_user SET RSA_PUBLIC_KEY = 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA...';

-- 設定を確認
DESCRIBE USER dbt_user;`}
          title="公開鍵登録とパスワード無効化"
          showLineNumbers={true}
          maxLines={15}
        />

        <h4 className="text-md font-semibold mb-2">手順3: 公開鍵フィンガープリントの検証（任意で）</h4>
        
        <CodeBlock
          code={`-- Snowflake側で公開鍵フィンガープリントを確認（RSA_PUBLIC_KEY_FPパラメーターを確認）
DESC USER dbt_user;

-- ローカルでフィンガープリントを計算
-- openssl rsa -pubin -in ~/.dbt/rsa_key.pub -outform DER | openssl dgst -sha256 -binary | openssl enc -base64

-- 両方の出力が一致することを確認してください`}
          title="公開鍵フィンガープリント検証"
          showLineNumbers={true}
          maxLines={15}
        />

        <h4 className="text-md font-semibold mb-2 mt-6">手順4: dbt profiles.ymlの設定</h4>
        
        <CodeBlock
          code={`# dbt設定ディレクトリを確認
ls -la ~/.dbt

# Snowflakeのアカウント識別子を取得
# Snowsightのワークシートで以下のSQLを実行してアカウント識別子を確認
# SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();

# 自分のSnowflakeのアカウント識別子を環境変数に保存
export SNOWFLAKE_ACCOUNT=<your_account_identifier>

# .envファイルに秘密鍵の内容をエスケープして保存
# 改行を\nに変換し、シングルクォートで囲む
echo "SNOWFLAKE_PRIVATE_KEY='$(cat ~/.dbt/rsa_key.p8 | sed ':a;N;$!ba;s/\\n/\\n/g')'" > ~/.dbt/.env

# profiles.ymlファイルを作成・編集
cat > ~/.dbt/profiles.yml << EOF
dbt_tutorial:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: $SNOWFLAKE_ACCOUNT
      user: dbt_user
      role: dbt_role
      warehouse: dbt_wh
      database: dbt_tutorial
      schema: my  # 任意の文字列
      private_key: "{{ env_var('SNOWFLAKE_PRIVATE_KEY') }}"
      threads: 8
EOF

# 作成されたファイルを確認
cat ~/.dbt/profiles.yml
cat ~/.dbt/.env`}
          title="dbt profiles.yml設定"
          showLineNumbers={true}
          maxLines={40}
          maxWidth="max-w-none"
        />

        <p className="mt-4">
          ここで、devcontainer環境をリビルドします。
          コマンドパレットを開いて、「Dev Containers: Rebuild Container」を実行します。
        </p>

        <CodeBlock
          code={`# dbt接続テスト
cd dbt_tutorial

dbt debug
dbtf debug`}
          title="dbt接続テスト"
          showLineNumbers={true}
          maxLines={10}
        />

        <Alert className="bg-green-50 dark:bg-green-950 border-l-4 border-green-400 mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold text-green-800 dark:text-green-200">キーペア認証設定完了</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300 leading-loose">
            以下の項目がすべて完了していることを確認してください：<br/>
            ✓ RSAキーペアの生成（秘密鍵・公開鍵）<br/>
            ✓ 公開鍵のSnowflakeへの登録<br/>
            ✓ 公開鍵フィンガープリントの検証（任意）<br/>
            ✓ dbt profiles.ymlの設定<br/>
            ✓ dbt debug コマンドでの接続確認<br/>
            これで、セキュアなキーペア認証を使用してdbtからSnowflakeに接続できる準備が整いました。
          </AlertDescription>
        </Alert>
        
        <p className="mt-4">
          これでSnowflake接続の準備が完了しました。セキュアなキーペア認証により、<br/>
          安全で効率的なdbt開発環境が整いました。
        </p>
      </div>



      {/* ページネーション */}
      <div className="mt-8 flex justify-between items-center">
        <div className="w-1/3">
          <a href="/text/pipeline/02" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Back
          </a>
        </div>
        <div className="w-1/3 text-center">
          <a href="/text/pipeline" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
            Top
          </a>
        </div>
        <div className="w-1/3 text-right">
          <a href="/text/pipeline/04" className="inline-flex items-center gap-2 p-2 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
            Next
          </a>
        </div>
      </div>
    </div>
  );
}
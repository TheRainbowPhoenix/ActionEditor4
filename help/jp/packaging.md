---
title: パッケージングについて（Enigma Virtual Boxの使い方）
layout: /src/layouts/Base.astro
breadcrumb:
  - name: サポート
    url: /menu_support/
  - name: アクションエディター4 ヘルプ
    url: /menu_support/actioneditor4_help/
  - name: パッケージングについて（Enigma Virtual Boxの使い方）
    url: /menu_support/actioneditor4_help/packaging/
keywords:
  - ヘルプ
  - アクションゲーム
  - アクションエディター
  - 制作ソフト
  - ツール
  - おもしろ
  - 無料
  - ゲーム
  - オンライン
description: アクションゲーム制作ソフト「アクションエディター4」のオンラインヘルプ。「パッケージングについて（Enigma Virtual Boxの使い方）」は「おもしろゲーム神殿」内のページです
---

<a name="TOP"></a>

## パッケージングについて（Enigma Virtual Boxの使い方） 目次

「Enigma Virtual Box」というフリーソフトを使って画像ファイルなどの素材をパッケージングする方法を紹介します。  
ここで紹介するパッケージングは、画像ファイル(.bmp)や音声ファイル(.wav)などのゲームで使用される素材をゲームプログラムファイル「Game_v*.exe」の中に埋め込んで隠します。  
これによって画像ファイルなどを直接見られる心配がなくなります。  

※ここで使用する「Enigma Virtual Box」のバージョンは2019年9月時点の最新版である9.30です。アップデートにより手順やボタンの配置などが変わる可能性があります。  

- [「Enigma Virtual Box」のインストール](#EVB_INSTALL)
- [パッケージングの手順](#PACKAGING)

<a name="EVB_INSTALL"></a>

## 「Enigma Virtual Box」のインストール

下記のサイトから「Enigma Virtual Box」というフリーソフトをダウンロードします。  
[http://enigmaprotector.com/en/downloads.html](http://enigmaprotector.com/en/downloads.html)  

ダウンロードしたファイル（enigmavb.exe）を実行し、セットアップウィザードに従ってインストールします。  
英語ですが、特に詰まる要素はないと思います。  

[このページの先頭へ](#TOP)

<a name="PACKAGING"></a>

## パッケージングの手順

#### 1.配布用のゲームフォルダを作成

下準備としてゲームフォルダをコピー＆貼り付けして2つに増やします。  
片方は開発用のゲームフォルダとしてとっておき、もう片方を配布用のゲームフォルダにします。  
配布用の方のフォルダ名は何でもいいですが、ここでは「Release」とします。  
もしパッケージングが上手くいかなかった場合、また開発用のゲームフォルダをコピペして最初からやり直しましょう。  

#### 2.パッケージングするファイルをまとめるためのフォルダを作成

ゲームフォルダ2つと同じ階層に空のフォルダを新規作成します。  
このフォルダはパッケージングするファイルをまとめるフォルダになります。  
フォルダ名は何でもいいですが、ここでは「Packaging」とします。  

[![](/menu_support/actioneditor4_help/packaging/02.jpg)](/menu_support/actioneditor4_help/packaging/02.jpg)

#### 3.パッケージングするファイルをまとめる

「Release」フォルダ内のパッケージングするファイルとフォルダを「Packaging」フォルダへ移動させます。  

パッケージングするフォルダ： bgm、bmp、wave、data  
パッケージングするファイル： Vox.dll、GuruGuruSMF4.dll  

パッケージングしないものはそのまま「Release」フォルダに残して、パッケージングするものだけを「Packaging」フォルダへ移動させましょう。  
※「user_data」フォルダはパッケージング対象ではありません。「user_data」フォルダをパッケージングするとゲーム内でセーブができなくなります。  

[![](/menu_support/actioneditor4_help/packaging/03.jpg)](/menu_support/actioneditor4_help/packaging/03.jpg)

#### 4.「Enigma Virtual Box」の起動

下準備が終わったので、ここからパッケージングしていきます。  
まず「Enigma Virtual Box」を起動します。  

#### 5.パッケージング前のゲームプログラムファイルの指定

「Enter Input File Name:」の欄に「Release」フォルダ内のゲームプログラムファイル（Game_v*.exe）を指定します。  
ファイル（Game_v*.exe）をドラッグ＆ドロップすると簡単に指定できます。  

[![](/menu_support/actioneditor4_help/packaging/05.png)](/menu_support/actioneditor4_help/packaging/05.png)

#### 6.パッケージング後のゲームプログラムファイルの指定

「Enter Output File Name:」の欄にパッケージング後のゲームプログラムファイル（保存先）を入力します。  
ファイル名はパッケージング前のゲームプログラムファイルと同じでなければ何でもいいです。  

[![](/menu_support/actioneditor4_help/packaging/06.png)](/menu_support/actioneditor4_help/packaging/06.png)

#### 7.パッケージングするフォルダの追加

ウインドウ下部にある「Add」ボタンを押すとメニューが出るので、その中から「Add Folder Recursive」を選択してください。  

[![](/menu_support/actioneditor4_help/packaging/07-1.png)](/menu_support/actioneditor4_help/packaging/07-1.png)

するとフォルダを選択するためのダイアログが表示されるので、パッケージング対象である「Packaging」フォルダを選択して「OK」ボタンを押します。  

[![](/menu_support/actioneditor4_help/packaging/07-2.png)](/menu_support/actioneditor4_help/packaging/07-2.png)

さらにもう一つダイアログが表示されるので、そのまま何も変えずに「OK」ボタンを押します。  

[![](/menu_support/actioneditor4_help/packaging/07-3.png)](/menu_support/actioneditor4_help/packaging/07-3.png)

#### 8.パッケージングの実行

「Process」ボタンをクリックしてパッケージングを実行します。  

[![](/menu_support/actioneditor4_help/packaging/08-1.png)](/menu_support/actioneditor4_help/packaging/08-1.png)

パッケージング実行中に出るダイアログの最後の行が「File successfully save to ～」となっていたら成功です。  
「Close」でそのダイアログを閉じます。  

[![](/menu_support/actioneditor4_help/packaging/08-2.png)](/menu_support/actioneditor4_help/packaging/08-2.png)

#### 9.パッケージング後のファイルを配布用ゲームフォルダへ移動

出来上がったファイルは「Enter Output File Name:」で指定した場所に保存されているので、それを「Release」フォルダへ移動させます。  
「Enter Output File Name:」で「Release」フォルダを保存先にしていた場合は移動する必要はありません。  

[![](/menu_support/actioneditor4_help/packaging/09.jpg)](/menu_support/actioneditor4_help/packaging/09.jpg)

#### 10.動作確認

最後にパッケージングされたゲームが正常に動作するかテストしましょう。  
ゲームデータのセーブもちゃんとできるかテストします（重要）。  
問題がなければ、パッケージング前のゲームプログラムファイルと「Packaging」フォルダはもう用済みなので削除します。  

パッケージングの解説は以上です。  
お疲れさまでした！  

[このページの先頭へ](#TOP)

---

  

[次のトピックへ](/menu_support/actioneditor4_help/bug/)

[ヘルプ目次へ](/menu_support/actioneditor4_help/)
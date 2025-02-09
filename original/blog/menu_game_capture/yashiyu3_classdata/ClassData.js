//@@@ 用語集
//特になし


//@@@ グローバル定数宣言
var NO_MEAN		=	0;
var FALSE		=	0;
var TRUE		=	1;
var NUMBER_MAX		=	4503599627370496;	//ナンバー型(倍精度)の最大値

// 最後に 「GT_TRUE」 にする
var GT_TRUE		=	0;		//テストでない
var GT_TEST		=	1;		//テスト
var GAME_TEST		=	GT_TRUE;	//テストプレイ用の変数
//

//クラスデータテーブル
var CLASS_MAX = 12;
var CLASS_DATA = new Array(CLASS_MAX);
CLASS_DATA[0] = new Array(8,2,8,8,3,3);
CLASS_DATA[1] = new Array(10,1,10,8,4,2);
CLASS_DATA[2] = new Array(7,3,8,7,4,5);
CLASS_DATA[3] = new Array(10,2,9,10,3,4);
CLASS_DATA[4] = new Array(2,10,2,1,9,10);
CLASS_DATA[5] = new Array(4,8,2,2,8,8);
CLASS_DATA[6] = new Array(1,8,1,2,10,7);
CLASS_DATA[7] = new Array(2,7,3,3,6,8);
CLASS_DATA[8] = new Array(7,5,6,8,6,5);
CLASS_DATA[9] = new Array(6,3,9,6,8,4);
CLASS_DATA[10] = new Array(4,6,5,3,6,7);
CLASS_DATA[11] = new Array(6,5,5,10,5,5);

var CLASS_NAME = new Array("こっぽうし","おのせんし","せいれいのきし","よろいけんし","ヒーラー","セイント","まどうし","けっかいし","フィールドナイト","アサシン","ソウルコレクター","シールドナイト");


//@@@ グローバル変数宣言
//テストクラス
var cTest = new TestClass();

var nTimerID;	//タイマーID

//========= クラス定義 ========================================================//
//@@ テストプレイ用のクラス
function TestClass()
{
	this.nCount	=	0;	//汎用カウンタ

	return this;
}
//=============================================================================//

//+++++++++ 関数定義 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//@@@ 「表示」ボタンがクリックされたときの処理
function OnClick_Show()
{
	//テキストフィールドの値を取得
	var LV = eval(document.Form.tfLevel.value);

	if (LV < 1 || 60 < LV)
	{
		alert("値が不正です！\nレベルは1～60まで！ 全角禁止！");
		return;
	}

	//セレクトメニューの値を取得
	var ClassNum = document.Form.smClass.selectedIndex;

	var Res = new Array(6);
	Res[0] = Math.floor( 40+CLASS_DATA[ClassNum][0]*2 + (380 + CLASS_DATA[ClassNum][0]*22) * LV / 60 );//HP
	Res[1] = Math.floor( 10+CLASS_DATA[ClassNum][1]   + (30  + CLASS_DATA[ClassNum][1]*24) * LV / 60 );//SP
	for (i = 2; i < 6; i++)
	{
		//こうげき～ていこう
		Res[i] = Math.floor( 20+CLASS_DATA[ClassNum][i] + (150 + CLASS_DATA[ClassNum][i]*15) * LV / 60 );
	}


	//テキストエリアに結果を表示
	document.Form.taResult.value = CLASS_NAME[ClassNum] + "\nLV " + LV + "\nHP " + Res[0] + "\nSP " + Res[1] + "\n攻 " + Res[2] + "\n守 " + Res[3] + "\n魔 " + Res[4] + "\n抗 " + Res[5];
	//===================//
}

//@@@ テスト
function Test(a,b,c)
{
	//なんと引数を配列指定で（連続で）表示できる
	for(i = 0 ; i < arguments.length ; i++ )
		document.writeln( arguments[i] );
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//@@@ 初期設定
function InitGame()
{
	document.write("<PRE>");	//改行前のお約束

	//=== レイアウト作成 ===//
	//「クラス」セレクトメニュー
	document.write( "<p><select name=smClass>" );
	for (i = 0; i < CLASS_MAX; i++)
	{
		document.write( "<option>" + CLASS_NAME[i]);
	}
	document.write( "</select>" );

	document.write( "の レベル" );

	//「レベル」テキストフィールド
	document.write( "<input type=text name=tfLevel STYLE=\"width: 30px; height: 20px;\"></p>\n" );
	document.Form.tfLevel.value = 1;

	//「表示」ボタン
	document.write( "<p><input type=button name=btShow STYLE=\"width: 60px; height: 30px;\" value=表示 OnClick=OnClick_Show()></p>\n" );

	//「結果表示」テキストエリア
	document.write( "<p><textarea name=taResult STYLE=\"width: 140px; height: 160px;\" rows=8></textarea></p>");
}

//@@@ 終了設定
function UninitGame()
{
	document.write("</PRE>");
}

//@@@ メイン処理
function GameMain()
{
}

//@@@ エントリーポイント
function EntryPoint()
{
	//ゲームの初期設定
	InitGame();

	//ゲームの終了設定
	UninitGame();
}
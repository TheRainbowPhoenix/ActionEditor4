jQuery(function()
{
/*
○おまとめソーシャルボタン利用例
・<ul class="sb" sb-url="http://hoge.jp/" sb-tweet-text="#ハッシュタグ"></ul>
・<ul class="sb" sb-tweet-text="#ハッシュタグ"></ul>		//sb-url属性省略で設置ページのURLになる
○参考
http://es.istgut.jp/tips/facebooktwittermixi.html
http://cappee.net/coding/social-button-matome
http://webscripter.jp/technical-note/customizing_the_buttons_of_sns/
*/
	window.onload = function()
	{
		//URLの取得
		var url = document.location.href;	//デフォルトでは設置ページのURLになる(ローカルテストでは無効なURLに)
		if ($("ul.sb").attr("sb-url") != undefined)
			url = $("ul.sb").attr("sb-url");
		//url = 'https://twitter.com/';		//??? test

		if( url.length >= 30 )	//URLの長さが30文字以上なら短縮する
		//if (1)						//全てのURLを短縮
		{
			//bitlyでURLを短縮
			var login="o_6ccin66hep";							//bitly公式サイトから
			var apiKey="R_49aecd0926f07291403111e434f10587";	//bitly公式サイトから
			$.ajax(
				{
					url:"http://api.bit.ly/v3/shorten",
					data:{longUrl:url,apiKey:apiKey,login:login},
					dataType:"jsonp",
					success:function(v)
					{
						var url_bitly=v.data.url;
						putSocialButton(url,url_bitly);
					},
					error:function()
					{
						putSocialButton(url,undefined);
					}
				}
			);
		}
		else
		{
			putSocialButton(url,undefined);
		}
	}
	
	//ソーシャルボタンの配置
	function putSocialButton(url,url_bitly) 
	{
		//各ボタンのリストタグを生成
		$("ul.sb").append('<li class="sb-tweet"></li><li class="sb-fb-like"></li><li class="sb-hatebu"></li>');
		
		//デフォルト本文の取得
		var text = '';
		if ($("ul.sb").attr("sb-text") != undefined)
			text += $("ul.sb").attr("sb-text");
			
		//--- ツイートボタンを設置 https://twitter.com/about/resources/buttons
		//短縮URLが指定されていれば採用
		var dataUrl = url;
		if (url_bitly != undefined)
			dataUrl = url_bitly;
		
		//デフォルト本文にハッシュを付加
		var twText = text;
		if ($("ul.sb").attr("sb-tweet-hash") != undefined)
			twText += '&nbsp;' + $("ul.sb").attr("sb-tweet-hash");
		
		//ボタンを設置
		$(".sb-tweet").append('<a href="https://twitter.com/share" class="twitter-share-button" data-url=' + dataUrl + ' data-counturl=' + url + ' data-count="none" data-text=' + twText + ' data-lang="ja">ツイート</a>');	//data-count="none,horizontal,vertical"		
		!function(d,s,id)
		{
			var js,fjs=d.getElementsByTagName(s)[0];
			if(!d.getElementById(id))
			{
				js=d.createElement(s);
				js.id=id;
				js.src="//platform.twitter.com/widgets.js";
				fjs.parentNode.insertBefore(js,fjs);
			}
		}
		(document,"script","twitter-wjs");
		
		/*	//??? 独自ボタン版（不採用）
		//ボタンを設置
		$(".sb-tweet").append(
			'<a href="http://twitter.com/share?count=horizontal&amp;original_referer=' + dataUrl + '&amp;text=' + twText + '&amp;url=' + url + '" onclick="window.open(this.href, ‘tweetwindow’, ‘width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1′); return false;"><img src="./img/btn_twitter_s.gif" width="20" height="20" /></a>'
		);
		*/
		
		//--- いいねボタンを設置 http://webscripter.jp/technical-note/customizing_the_buttons_of_sns/
		$(".sb-fb-like").append(
			'<a class="fb-like" href="http://www.facebook.com/plugins/like.php?href=' + url + '" onclick="javascript:window.open(\'http://www.facebook.com/plugins/like.php?href=' + url + '\' ,null ,\'width=650 ,height=450\'); return false;" rel="nofollow"><img src="/image/f_like.gif" width="71" height="20" /></a>'
		);

		/* ??? FaceBookのオフィシャルボタン版。アイコンでかくてFBのカウントも消せないので不採用
		//--- いいねボタンを設置 https://developers.facebook.com/docs/reference/plugins/like/
		(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.async = true;
		js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1&appId="; //appIdを追加
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		$(".sb-fb-like").append('<div class="fb-like" data-href="' + document.location.href + '" data-send="false" data-layout="button_count" data-width="110" data-show-faces="false"></div>');	//data-layout="standard,button_count,box_count"	カウント消すとテキストがでる
		*/
		
		//--- はてなボタンを設置 http://b.hatena.ne.jp/guide/bbutton
		$(".sb-hatebu").append('<a href="http://b.hatena.ne.jp/entry/" class="hatena-bookmark-button" data-hatena-bookmark-layout="simple" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>');

	/*
		//--- プラス1ボタンを設置 https://developers.google.com/+/plugins/+1button/
		$(".sb-gplus").append('<div class="g-plusone" data-size="medium" data-annotation="none">g+1</div>');
		window.___gcfg = {lang: 'ja'};
		(function() {
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/plusone.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		})();
		*/
	};
});

/**********************************************************************

  ﾃ･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ･窶窶ｦﾃ･ﾂｮﾂｹﾃ｣ﾆ陳・｣窶堋ｧﾃ｣ﾆ槌津｣窶堋ｯ

**********************************************************************/

var sendFlag = false;

//ﾃｨﾂｨﾋ愿､ﾂｺ窶ｹﾃ･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ･窶窶ｦﾃ･ﾂｮﾂｹﾃ｣ﾆ陳・｣窶堋ｧﾃ｣ﾆ槌津｣窶堋ｯ
function checkDiaryForm(form) {
	if (form.subj && !form.subj.value) {
		alert('ﾃｩﾂ｡ﾅ津･ﾂ青催｣ﾂ・津･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ｣ﾂ≫｢ﾃ｣窶塲津｣ﾂ・ｦﾃ｣ﾂ≫榲｣ﾂ・ｾﾃ｣ﾂ≫ｺﾃ｣窶壺愿｣竄ｬ窶・');
		return false;
	}
	if (form.text && !form.text.value) {
		alert('ﾃｦﾅ督ｬﾃｦ窶凪｡ﾃ｣ﾂ・津･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ｣ﾂ≫｢ﾃ｣窶塲津｣ﾂ・ｦﾃ｣ﾂ≫榲｣ﾂ・ｾﾃ｣ﾂ≫ｺﾃ｣窶壺愿｣竄ｬ窶・');
		return false;
	}

	if (sendFlag == true) {
		alert('ﾃ､ﾂｺﾅ津ｩ窶｡ﾂ催ｦﾅ窶｢ﾃｧﾂｨﾂｿﾃ｣ﾂ・ｯﾃｧﾂｦﾂ・ｦﾂｭﾂ｢ﾃ｣ﾂ・ｧﾃ｣ﾂ≫┐ﾃ｣竄ｬ窶・');
		return false;
	} else {
		sendFlag = true;
	}

	return true;
}

//ﾃ｣窶堋ｳﾃ｣ﾆ陳｡ﾃ｣ﾆ陳ｳﾃ｣ﾆ塚・･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ･窶窶ｦﾃ･ﾂｮﾂｹﾃ｣ﾆ陳・｣窶堋ｧﾃ｣ﾆ槌津｣窶堋ｯ
function checkCommentForm(form) {
	if (form.name && !form.name.value) {
		alert('ﾃ･ﾂ青催･窶ｰﾂ催｣ﾂ・津･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ｣ﾂ≫｢ﾃ｣窶塲津｣ﾂ・ｦﾃ｣ﾂ≫榲｣ﾂ・ｾﾃ｣ﾂ≫ｺﾃ｣窶壺愿｣竄ｬ窶・');
		return false;
	}
	if (form.text && !form.text.value) {
		alert('ﾃｦﾅ督ｬﾃｦ窶凪｡ﾃ｣ﾂ・津･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ｣ﾂ≫｢ﾃ｣窶塲津｣ﾂ・ｦﾃ｣ﾂ≫榲｣ﾂ・ｾﾃ｣ﾂ≫ｺﾃ｣窶壺愿｣竄ｬ窶・');
		return false;
	}

	if (sendFlag == true) {
		alert('ﾃ､ﾂｺﾅ津ｩ窶｡ﾂ催ｦﾅ窶｢ﾃｧﾂｨﾂｿﾃ｣ﾂ・ｯﾃｧﾂｦﾂ・ｦﾂｭﾂ｢ﾃ｣ﾂ・ｧﾃ｣ﾂ≫┐ﾃ｣竄ｬ窶・');
		return false;
	} else {
		sendFlag = true;
	}

	return true;
}

/**********************************************************************

  ﾃ｣窶堋ｫﾃ｣ﾆ陳ｬﾃ｣ﾆ陳ｳﾃ｣ﾆ停ぎﾃ｣ﾆ陳ｼ

**********************************************************************/

//ﾃｦﾅ督ｬﾃｦ窶板･ﾃ｣ﾂ・ｮﾃ｣窶堋ｻﾃ｣ﾆ陳ｫﾃｨ窶ｰﾂｲﾃ｣窶壺凖･ﾂ､窶ｰﾃｦ窶ｺﾂｴ
function setCalendar() {
	var today = new Date();
	var year  = new String(today.getFullYear());
	var month = new String(today.getMonth() + 1);
	var date  = new String(today.getDate());

	while (month.length < 2) {
		month = '0' + month;
	}
	while (date.length < 2) {
		date = '0' + date;
	}

	var node_calendar_cel = document.getElementById('calendar_' + year + month + date);
	if (node_calendar_cel) {
		node_calendar_cel.className = 'today';
	}

	return;
}

/**********************************************************************

  ﾃ･窶｡ﾂｦﾃｧﾂ絶ﾃｩ窶凪ｹﾃ･ﾂｧ窶ｹ

**********************************************************************/

//ﾃｨﾂｪﾂｭﾃ｣ﾂ・ｿﾃｨﾂｾﾂｼﾃ｣ﾂ・ｿﾃ･ﾂｮﾅ津､ﾂｺ窶ﾃｦ邃｢窶・
window.onload = function() {
	//ﾃ｣ﾆ塚・｣ﾆ槌津｣ﾆ停氾｣窶堋ｦﾃ｣窶堋､ﾃ｣ﾆ陳ｳﾃ｣ﾆ停ｰﾃ｣窶堋ｦﾃｦ窶ｺﾂｴﾃｦ窶督ｰﾃｧ窶敖ｨ
	if (top.location != self.location) {
		var node_a = document.getElementsByTagName('a');
		for (var i in node_a) {
			if (node_a[i].className == 'top') {
				node_a[i].onclick = function() {
					window.top.location = this.href;
				};
			}
		}
	}

	//ﾃ｣窶堋ｫﾃ｣ﾆ陳ｬﾃ｣ﾆ陳ｳﾃ｣ﾆ停ぎﾃ｣ﾆ陳ｼﾃｧ窶敖ｨ
	setCalendar();

	//ﾃ･窶ｦﾂ･ﾃ･ﾅ窶ｺﾃ･窶窶ｦﾃ･ﾂｮﾂｹﾃ｣ﾆ陳・｣窶堋ｧﾃ｣ﾆ槌津｣窶堋ｯ
	var node_diary_form = document.getElementById('diary_form');
	if (node_diary_form) {
		node_diary_form.onsubmit = function() {
			return checkDiaryForm(node_diary_form);
		};
	}
	var node_comment_form = document.getElementById('comment_form');
	if (node_comment_form) {
		node_comment_form.onsubmit = function() {
			return checkCommentForm(node_comment_form);
		};
	}
};
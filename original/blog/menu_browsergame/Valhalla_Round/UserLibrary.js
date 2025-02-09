    
function Array2D(_nNum,_nNum2)
{
	this.length = _nNum;

	for (i = 0; i < _nNum; i++)
	this[i] = new Array(_nNum2);

	return this;
}




function Array_AlertAll(szHead)
{
	var str = szHead + "\n";
	for (var i = 0; i < this.length; i++)
		str += i + "@" + this[i] + "\n";

	alert(str);
}
Array.prototype.AlertAll = Array_AlertAll;



function Array_GetMaxNum()
{
	var max = -1000000000, num = 0;

	for (var i = 0; i < this.length; i++)
	{
		if (this[i] > max)
		{
			max = this[i];
			num = i;
		}
	}

	return num;
}
Array.prototype.GetMaxNum = Array_GetMaxNum;



function Array_GetMinNum()
{
	var min = 1000000000, num = 0;

	for (var i = 0; i < this.length; i++)
	{
		if (this[i] < min)
		{
			min = this[i];
			num = i;
		}
	}

	return num;
}
Array.prototype.GetMinNum = Array_GetMinNum;



function Array_ZeroMemory()
{
	for (var i = 0; i < this.length; i++)
		this[i] = 0;

	return this;
}
Array.prototype.ZeroMemory = Array_ZeroMemory;


function GetRand(_nMin,_nMax)
{
	return (_nMin + Math.floor(Math.random() * (_nMax+1)));
}


function SetStyle_display(_Element,_Param)
{
	inputElements = document.getElementsByTagName("input");
	for (var i = 0; i < inputElements.length; i++)
	{
		if (_Element == inputElements[i])
	  		inputElements[i].style.display = _Param;
	}
}


function SetStyle_backgroundColor(_Element,_Param)
{
	inputElements = document.getElementsByTagName("input");
	for (var i = 0; i < inputElements.length; i++)
	{
		if (_Element == inputElements[i])
	  		inputElements[i].style.backgroundColor = _Param;
	}
}
function readMore(i){

	let dots = document.getElementById("dots"+i);
	let more = document.getElementById("more"+i);
	let btn = document.getElementById("btn"+i);

	if(dots.style.display === "none")
	{
		dots.style.display = "inline";
		btn.innerHTML = "continue reading";
		more.style.display = "none";
	}
	else
	{
		dots.style.display = "none";
		btn.innerHTML = " Hide";
		more.style.display = "inline";
	}
}

// function readMore1(i){
// 	let btn = document.getElementById("btn"+i);

// 	if(!document.getElementById("dots"+i).classList.contains("showHide"))
// 	{ы
// 		document.getElementById("dots"+i).classList.add("showHide");
// 		btn.innerHTML = "continue reading";
// 		document.getElementById("more"+i).classList.remove("showHide");
// 	}
// 	else
// 	{
// 		document.getElementById("dots"+i).classList.remove("showHide");
// 		btn.innerHTML = " Hide";
// 		document.getElementById("more"+i).classList.add("showHide");
// 	}
// }
$(function(){///////// JQB /////////////////////
	

	////// 링크이동 설정 //////
	/// 메인페이지로 이동 ///
	$(".logo a").click(function (e) {
		e.preventDefault(); // 기본이동막기
		location.href = "main.html";
	}); ////// click /////////////////

	/// 컨트리맨 페이지로 이동 ///
	$(".m1 a, .country a").click(function (e) {
		e.preventDefault(); // 기본이동막기
		location.href = "countryman.html";
	}); ////// click /////////////////
	/// 5door hatch 페이지로 이동 ///
	$(".m2 a, .hatch a").click(function (e) {
		e.preventDefault(); // 기본이동막기
		location.href = "hatch.html";
	}); ////// click /////////////////
	/// 클럽맨 페이지로 이동 ///
	$(".m3 a, .club a").click(function (e) {
		e.preventDefault(); // 기본이동막기
		location.href = "clubman.html";
	}); ////// click /////////////////
	
	
	
	
	
	
	
	
	
	
});//////////// JQB ////////////////////////////
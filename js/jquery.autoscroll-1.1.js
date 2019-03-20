///////// 자동스크롤기능 JS ///////////

//////////////// 전역변수 구역 ///////////////////
var pno = 0; //// 현재 페이지 번호(첫페이지 0)
const totcnt = 5; //// 전체페이지수 -> const는 상수
var prot = 0; //광스크롤막기변수(0-허용,1-막기)
var scNo = 0;
if ($(window).width() < 1024) scNo = 1; //자동스크롤 금지설정
//console.log(scNo);
var hamprot = 0; // 햄 버튼 잠금장치
////////////////////////////////////////////////

$(function () { /// jQB ////////////////


  var h = 0;

  $(".ham").click(function () {

    if (hamprot === 1) return false;
    hamprot = 1;
    setTimeout(function () {
      hamprot = 0;
    }, 1500);

    var hamsrc = $(this).attr("src").replace("X", "ham")
    var xsrc = $(this).attr("src").replace("ham", "X");

    if (h === 0) {
      $(this).attr("src", xsrc);
      $(".ham_menu").css({
        right: "-0%",
        transition: "all 1.5s"
      }); /// css ////
      h = 1;
    } //// if문 ////
    else if (h === 1) {
      $(this).attr("src", hamsrc);
      $(".ham_menu").css({
        right: "-200%",
        transition: "all 1.5s"
      }); /// css ////
      h = 0;
    }

  }); //// click ////


  /// 서브 메인 화면에서 #gnb li에 있는 selM class 지우기
  $("#gnb li").removeClass("selM");


  // 새로고침시 스크롤위치를 처음으로 변경하기
  $("html,body").stop().delay(500)
    .animate({
      scrollTop: "$(window).height()*0.08"
    }, 500);
  //////////////////////////////////////

  $(".sbox").css({
    paddingTop: $(window).height() * 0.08 + "px",
    paddingBottom: $(window).height() * 0.08 + "px"
  }); /// css ///

  /////// 마우스휠 이벤트는 문서전체에 적용함!!!////
  $(document).on("mousewheel DOMMouseScroll",
    function (e) {


      
      if (scNo === 1) return true;



      // 1. 스크롤 기본기능막기!
      e.preventDefault();
      //console.log("휠스크롤중~~~!");    


      /// 스크롤이동중 잠금장치!!! ///////
      if (prot === 1) return false; //돌아가!
      prot = 1; //잠금상태변경
      //////////////////////////////////


      // 2. ie구버전 구분하기
      var evt = window.event || e;
      var delta = evt.detail ? evt.detail : evt.wheelDelta;
      if (/Firefox/i.test(navigator.userAgent)) {
        delta = -evt.originalEvent.detail; //앞에 마이너스를 쓰면 방향이 반대
      } /// if문 ////



      //// 마우스휠 방향에 따라서 페이지번호 변경하기 //
      if (delta > 0) { // 윗방향(양수)
        pno--; //페이지번호 감소
        if (pno === -1) pno = 0; //한계수지정
      } //// if 문 //////
      else { // 아랫방향(음수)
        pno++; //페이지번호 증가
        if (pno === totcnt) {
          pno = totcnt - 1; //한계수지정
        } /// if 문
      } ///// else 문 //////

      //console.log("페이지번호: " + pno);


      //// 4. 해당순번 페이지 높이값(top) 구하기
      var pagepos = $(".sbox").eq(pno).offset().top;

      //// 5. 페이지이동 애니메이션 /////
      $("html,body").stop().animate({
        scrollTop: pagepos + "px"
      }, 500, "easeInOutQuint", function () {
        prot = 0; //잠금해제!
        pageAction();
      }); //////// animate //////////

      /// 미리 실행할 페이지 액션함수 호출
      preAction();

      /// 현재메뉴 변경하기 함수호출
      chgMenu();

    }); //////////// mousewheel //////////////////
  /////////////////////////////////////////////
  /////////////////////////////////////////////


  /// GNB의 a링크를 클릭하면 해당페이지 위치로 스크롤 애니메이션
  /// 블릿네비게이션도 동일한 구조임! 선택자추가!
  $("#gnb a").click(function (e) {
    // a태그 기본이동 막기
    e.preventDefault();
    // a태그의 href값 읽어오기
    var pid = $(this).attr("href");
    //console.log(pid);
    // 현재 클릭된 a태그의 부모li의 순번알아오기
    var idx = $(this).parent().index();
    pno = idx; //이동할 메뉴의 순번을 페이지번호와 일치시킴


    // 클릭된 id박스 위치 알아내기
    var pagepos = $(pid).offset().top;
    // -> JS의 offsetTop 속성과 같음!
    // offset().top은 현재 선택요소의 top값을 px단위없는 px숫자값으로 리턴한다.
    //console.log("이동할 id박스 위치값: " + pagepos);

    ////// 스크롤 애니메이션 /////
    // 애니메이션이 Queue에 등록된 것을 삭제->stop()
    // scrollTop 속성은 세로스크롤바 위치
    $("html,body").stop().animate({
      scrollTop: pagepos + "px"
    }, 100, "easeInOutQuint"); ///// animate //////

    /// 현재메뉴 변경하기
    $("#gnb li").eq(pno).addClass("selM")
      .siblings().removeClass("selM");


  }); /// click /////////////////


  /// 각 페이지 초기화 함수 호출하기
  initSet();


}); ///// jQB ////////////////////
/////////////////////////////////
/////////////////////////////////



/*//////////////////////////////////////////////
  함수명: chgMenu
  기능: GNB메뉴를 현재 페이지와 일치되게 변경함
*/ ///////////////////////////////////////////////
function chgMenu() {
  var scrollpno = pno - 1
  //// 클릭된 메뉴의 class 변경하기(나머지지우기)
  $("#gnb li").eq(scrollpno).addClass("selM")
    .siblings().removeClass("selM");
  if (pno === 0) {
    $("#gnb li").removeClass("selM");
  }
} //// chgMenu함수 ///////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////



///*//////////////////////////////////////////////
//	함수명 : initSet
//	기능 : 각 페이지의 등장액션을 위한 초기셋팅하기
//*/ //////////////////////////////////////////////
//
function initSet() {

} ////// initset ///////////////////////////////
/*//////////////////////////////////////////////
	함수명 : preAction
	기능 : 페이지 액션을 이동시 먼저 실행할 동작만 모음
*/ //////////////////////////////////////////////
function preAction() {
  /// footer페이지에서 #gnb 숨기기
  if (pno === 4) {
    $("#gnb").hide();
  } /// if문 ///
  else { // 나머지 페이지일 때 gnb 나타내기
    $("#gnb").show();
  } /// else문 ////

} /////// preAction /////////////////////////////
//////////////////////////////////////////////////
//
///*//////////////////////////////////////////////
//	함수명 : pageAction
//	기능 : 각 페이지 별 등장액션 셋팅.
//*/ //////////////////////////////////////////////
//
function pageAction() {


} ////// pageAction ///////////////////////////////

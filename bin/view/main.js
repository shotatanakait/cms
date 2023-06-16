$(function () {
  // CONSTANT
  var POST_COUNT = 10;
  lastArticles(POST_COUNT);
  rankArticles(POST_COUNT);
  linkKeywords();

  // ナビゲーションメニューの開閉をハンドルする
  $(".humberger-btn").click(function () {
    $(this).toggleClass("close");
    // $(".header-nav").fadeToggle(300);
    $(".header-nav").toggleClass("nav-open");
    $("body").toggleClass("noscroll");
  });

  // ナビゲーションからのページ内リンクをハンドルする
  $(".nav-item a").click(function () {
    // PC ver.
    var id = $(this).attr("href");
    var position = $(id).offset().top;
    $("html, body").animate({ scrollTop: position }, 300);

    // SP ver.
    if ($(".humberger-btn").css("display") !== "none") {
      $(".humberger-btn").toggleClass("close");
      $(".header-nav").fadeToggle(300);
      $("body").toggleClass("noscroll");
    }
  });

  // Search 押下時にナビゲーションを閉じる
  $("#full-search-btn").click(function () {
    $(".humberger-btn").toggleClass("close");
    $(".header-nav").toggleClass("nav-open");
    $("body").toggleClass("noscroll");
  });
});

function lastArticles(num) {
  var httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function () {
    if (httpReq.readyState != 4 || httpReq.status != 200) return;
    document.getElementById("last-articles").innerHTML = httpReq.responseText;
  };

  var url = "/last_articles.cgi?num=" + num;
  httpReq.open("GET", url, true);
  httpReq.send(null);
}

function linkKeywords() {
  var httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function () {
    if (httpReq.readyState != 4 || httpReq.status != 200) return;
    document.getElementById("keywords").innerHTML = httpReq.responseText;
  };

  var word = document.getElementById("keywords").innerHTML;
  var url = "/link_keywords.cgi?keywords=" + encodeURIComponent(word);
  httpReq.open("GET", url, true);
  httpReq.send(null);
}

function fullSearch() {
  var word = document.getElementById("full-search-input").value;
  var httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function () {
    if (httpReq.readyState != 4 || httpReq.status != 200) return;
    document.getElementById("article-body").innerHTML = httpReq.responseText;
    document.body.style.cursor = "default";
  };

  var url = "/full_search.cgi?word=" + encodeURIComponent(word);
  httpReq.open("GET", url, true);
  httpReq.send(null);
  document.body.style.cursor = "wait";
}

function rankArticles(num) {
  var httpReq = new XMLHttpRequest();
  httpReq.onreadystatechange = function () {
    if (httpReq.readyState != 4 || httpReq.status != 200) return;
    document.getElementById("rank-articles").innerHTML = httpReq.responseText;
  };

  var url = "/rank_articles.cgi?num=" + num;
  httpReq.open("GET", url, true);
  httpReq.send(null);
}

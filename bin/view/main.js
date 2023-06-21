$(function () {
  // CONSTANT
  var POST_COUNT = 10;
  lastArticles(POST_COUNT);
  rankArticles(POST_COUNT);
  linkKeywords();

  // Search ボタンの活性／非活性
  $serchBtn = $("#full-search-btn");
  $("#full-search-input").on("input", function (e) {
    var value = $(this).val();
    if (!value) {
      $serchBtn.attr("disabled", true);
    } else {
      $serchBtn.attr("disabled", false);
    }
  });

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

  // ナビゲーション close
  function closeNavigation() {
    $(".humberger-btn").toggleClass("close");
    $(".header-nav").toggleClass("nav-open");
    $("body").toggleClass("noscroll");
    $(window).scrollTop(0);
  }

  // Search 押下時にナビゲーションを閉じる
  $("#full-search-btn").click(function () {
    closeNavigation();
  });

  // Search を Enter key で押下
  $(document).keypress(function (e) {
    if (e.which === 13) {
      if ($("#full-search-input").is(":focus")) {
        fullSearch();
        closeNavigation();
      }
    }
  });
});

// 共通の取得処理
function fetch(url, id) {
  axios
    .get(url)
    .then((response) => {
      document.getElementById(id).innerHTML = response.data;
    })
    .catch((error) => console.error({ error }));
}

// last posts
function lastArticles(num) {
  fetch("/last_articles.cgi?num=" + num, "last-articles");
}

// link keywords
function linkKeywords() {
  const word = document.getElementById("keywords").innerHTML;
  fetch("/link_keywords.cgi?keywords=" + encodeURIComponent(word), "keywords");
}

// full search
function fullSearch() {
  const word = document.getElementById("full-search-input").value;
  fetch("/full_search.cgi?word=" + encodeURIComponent(word), "article-body");
}

// pv ranking
function rankArticles(num) {
  fetch("/rank_articles.cgi?num=" + num, "rank-articles");
}

// $(function(){
//     var $newSearch = $("#newSearch");
//     var $newsearchBox = $("#searchBar");
//     var $searchBtn = $("#newband");

//     $newSearch.hide();

    $(window).scroll(function(){
        if($(window).scrollTop() + $(window).height() ==
          $("#home").height()) {
              $("#newSearch").hide();
            //   alert("finally");
            console.log("done");
          }
    })


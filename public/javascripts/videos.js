$(document).ready(function () {

  function notFound() {
    if (console && console.log) {
      console.log("404 Not Found");
    }
  }

  function isPlayerVisible() {
    return $('#dark-bar:visible').length > 0;
  }

  (function () {
    var nav = $('#dark-bar');
    var navHomeY = nav.offset().top;
    var isFixed = false;
    var $w = $(window);
    $w.scroll(function() {
        var scrollTop = $w.scrollTop();
        var shouldBeFixed = scrollTop > navHomeY;
        if (shouldBeFixed && !isFixed) {
            nav.css({
                position: 'fixed',
                top: 0
            });
            isFixed = true;
        }
        else if (!shouldBeFixed && isFixed)
        {
            nav.css({
                position: 'absolute',
                top: navHomeY
            });
            isFixed = false;
        }
    });
  })();

  Path.map("/videos/:videoKey/:provider/:title").to(function () {
    var urlOrHtml = getVideoHtml(this.params["videoKey"], this.params["provider"]);
    if (isPlayerVisible()) {
      $('#player').html(urlOrHtml);
    } else {
      window.open(urlOrHtml, 'play-video');
    }
  });

  Path.root("/videos");
  Path.rescue(notFound);
  Path.history.listen(true);

  function getVideoHtml(videoKey, provider) {
    var urlOrHtml;
    var getHtml = isPlayerVisible();
    if (provider === "youtube") {
      if (getHtml) {
        urlOrHtml = '<iframe width="90%" height="392" src="http://www.youtube.com/embed/' + videoKey + '?feature=oembed" frameborder="0" allowfullscreen></iframe>';
      } else {
        urlOrHtml = "http://www.youtube.com/watch?v=" + videoKey;
      }
    }
    if (provider === "vimeo") {
      if (getHtml) {
        urlOrHtml = '<iframe src="http://player.vimeo.com/video/' + videoKey + '?title=0&amp;byline=0&amp;portrait=0&amp;color=3B65AF" width="100%" height="392" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
      } else {
        urlOrHtml = "http://vimeo.com/" + videoKey;
      }
    }
    return urlOrHtml;
  }

  function clickHandler(event) {
    event.preventDefault();
    var ele = $(this);
    var title = ele.attr('title') + " - thebicho.com";
    $('head title').html(title);
    Path.history.pushState({}, title, ele.attr("href"));
  }

  function list(videos) {
    var ctr = document.getElementById("videos-list");
    var selected = $('#selectedVideoId').html();
    for (var i = 0; i < videos.length; i++) {
      var v = videos[i];
      var provider_name = v.provider_name.toLowerCase();
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute("class", provider_name + "-thumb-container");
      var imgCtr = document.createElement('div');
      var img = document.createElement('img');
      var h4 = document.createElement('h4');
      var span = document.createElement('span');
      var urlParts = v.video_url.split("/");
      var videoKey = urlParts[urlParts.length - 1];
      img.src = v.thumbnail_url;
      img.alt = v.title + ' by ' + v.author_name;
      img.setAttribute("class", provider_name + "-thumb");
      imgCtr.appendChild(img);
      imgCtr.setAttribute("class", "image-container");
      h4.innerHTML = v.title;
      h4.title = v.title;
      span.innerHTML = "(" + v.author_name + ")";
      a.href = "/videos/" + videoKey + "/" + provider_name + "/" + v.title;
      a.onclick = clickHandler;
      a.title = img.alt;
      a.appendChild(imgCtr);
      a.appendChild(h4);
      a.appendChild(span)
      li.appendChild(a);
      ctr.appendChild(li);
      if (selected === '') {
        if (i === 0) {
          a.click();
        }
      } else {
        if (selected === videoKey) {
          a.click();
        }
      }
    }
  }

  function getVideos() {
    $.ajax({
      url: "/videos.json",
      success: function (data) {
        list(data);
      },
      error: function (err) {
        if (console && console.log) {
          console.log(err);
        }
      }
    })
  }
  getVideos();

});

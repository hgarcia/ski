$(document).ready(function () {

  function clickHandler(ev) {
    var player = document.getElementById('player');
    var provider = this.getAttribute("data-provider");
    var urlParts = this.getAttribute("data-url").split("/");
    var videoKey = urlParts[urlParts.length - 1];
    var h = "";
    if (provider === "youtube") {
      h = '<iframe width="90%" height="392" src="http://www.youtube.com/embed/' + videoKey + '?feature=oembed" frameborder="0" allowfullscreen></iframe>';
    }
    if (provider === "vimeo") {
      h = '<iframe src="http://player.vimeo.com/video/' + videoKey + '?title=0&amp;byline=0&amp;portrait=0&amp;color=3B65AF" width="100%" height="392" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
    }
    player.innerHTML = h;
  }

  function list(videos) {
    var ctr = document.getElementById("videos-list");
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
      img.src = v.thumbnail_url;
      img.alt = v.title + ' by ' + v.author_name;
      img.setAttribute("class", provider_name + "-thumb");
      imgCtr.appendChild(img);
      imgCtr.setAttribute("class", "image-container");
      h4.innerHTML = v.title;
      h4.title = v.title;
      span.innerHTML = "(" + v.author_name + ")";
      a.href = "#";
      a.title = img.alt;
      a.setAttribute("data-url", v.video_url);
      a.setAttribute("data-provider", provider_name);
      a.appendChild(imgCtr);
      a.onclick = clickHandler;
      a.appendChild(h4);
      a.appendChild(span)
      li.appendChild(a);
      ctr.appendChild(li);
    }
  }

  function getVideos() {
    $.ajax({
      url: "/videos.json",
      success: function (data) {
        console.log(data);
        list(data);
      },
      error: function (err) {
        console.log(err);
      }
    })
  }
  getVideos();

});

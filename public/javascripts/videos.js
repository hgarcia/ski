var videos = [
  {title: "Scattered fluries", author: "FELT SOUL MEDIA", url: "7875517", thumb: "http://b.vimeocdn.com/ts/353/277/35327738_150.jpg", page: "http://vimeo.com/7875517"},
  {title: "Pillow talk", author: "David Peacock", url: "58427085", thumb: "http://b.vimeocdn.com/ts/405/525/405525695_150.jpg", page: "http://vimeo.com/58427085"},
  {title: "Drop in with Zack Giffin in Alaska", author: "Outdoor Research", url: "54890788", thumb: "http://b.vimeocdn.com/ts/379/669/379669759_150.jpg", page: "http://vimeo.com/54890788"},
  {title: "Being there - Happy New Year", author: "Field Productions", url: "34463132", thumb: "http://b.vimeocdn.com/ts/234/696/234696215_150.jpg", page: "http://vimeo.com/34463132"},
  {title: "This is my winter", author: "TimeLine Films", url: "31572650", thumb: "http://b.vimeocdn.com/ts/221/924/221924203_150.jpg", page: "http://vimeo.com/31572650"},
  {title: "Powder mountain perspective", author: "The Provo Bros", url: "3155182", thumb: "http://b.vimeocdn.com/ts/381/388/381388779_150.jpg", page: "http://vimeo.com/3155182"},
  {title: "Parallels", author: "Dendrite Studios", url: "22870458", thumb: "http://b.vimeocdn.com/ts/164/403/164403650_150.jpg", page: "http://vimeo.com/22870458"},
  {title: "Mining powder at Retallack", author: "The Provo Bros", url: "31522247", thumb: "http://b.vimeocdn.com/ts/212/564/212564933_150.jpg", page: "http://vimeo.com/31522247"}
];
function clickHandler(ev) {
  var attr = this.getAttribute("data-url");
  var h = '<iframe src="http://player.vimeo.com/video/' + attr + '?title=0&amp;byline=0&amp;portrait=0&amp;color=3B65AF" width="100%" height="535" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
  document.getElementById('player').innerHTML = h;
}
function list() {
  var ctr = document.getElementById("videos-list");
  for (var i = 0; i < videos.length; i++) {
    var v = videos[i];
    var li = document.createElement('li');
    var a = document.createElement('a');
    var img = document.createElement('img');
    var h4 = document.createElement('h4');
    var span = document.createElement('span');
    img.src = v.thumb;
    img.alt = v.title + ' by ' + v.author;
    h4.innerHTML = v.title;
    h4.title = v.title;
    span.innerHTML = "(" + v.author + ")";
    a.href = "#" + v.url;
    a.title = img.alt;
    a.setAttribute("data-url", v.url);
    a.appendChild(img);
    a.onclick = clickHandler;
    a.appendChild(h4);
    a.appendChild(span)
    li.appendChild(a);
    ctr.appendChild(li);
  }
}
list();

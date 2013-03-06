var moment = require('moment');

exports.init = function (db) {
  var videos = db.collection('videos');
  return {
    create: function (dto, cb) {
      if (!dto.description) {
        dto.description = "";
        delete dto.is_plus;
        delete dto.duration;
        delete dto.video_id;
      }
      dto.created = moment.utc();
      videos.save(dto, {safe: true}, cb);
    },
    findById: function(id, cb) {
      videos.findById(id, cb);
    },
    list: function (query, cb) {
      videos.find({}, {"sort": {"created": -1}}).toArray(cb);
    }
  };
};

/*
{"type":"video",
"version":"1.0",
"provider_name":"Vimeo",
"provider_url":"http:\\/\\/vimeo.com\\/",
"author_name":"burn",
"author_url":"http:\\/\\/vimeo.com\\/burn",
"title":"burn PRESENTS: We Ride - The Story of Snowboarding (Full Movie)",
"height":720,
"width":1280,
"html":"<iframe src=\\"http:\\/\\/player.vimeo.com\\/video\\/60571386\\" width=\\"1280\\" height=\\"720\\" frameborder=\\"0\\" webkitAllowFullScreen mozallowfullscreen allowFullScreen><\\/iframe>",
"thumbnail_height":720,
"thumbnail_width":1280,
"thumbnail_url":"http:\\/\\/b.vimeocdn.com\\/ts\\/421\\/106\\/421106792_1280.jpg",
"description":"A compelling, dramatic and stylish cinematic journey into snowboarding\'s unique history and the wider cultural forces that shaped it.  \\n\\nFeaturing interviews and archival footage with Todd Richards, Gigi R\\u00fcf, Terje Haakonsen, Jake Burton, Tom Sims, Stale Sandbech and Craig Kelly. \\n\\nWe Ride is A burn Production, filmed and edited by Grain Media. \\n\\nDirected by Orlando von Einsiedel and Jon Drever.\\n\\nLIKE burn on Facebook http:\\/\\/www.facebook.com\\/burn\\nFOLLOW burn on Twitter http:\\/\\/www.twitter.com\\/burn\\nMORE info on http:\\/\\/www.burn.com\\nMORE info on Grain Media http:\\/\\/grainmedia.co.uk\\/\\n#WeRide",
"is_plus":"1",
"duration":5540,
"video_id":60571386
}
*/
/*
{
type: 'video',
version: '1.0',
provider_name: 'YouTube',
provider_url: 'http://www.youtube.com/',
author_name: 'freeskiRichardPermin',
author_url: 'http://www.youtube.com/user/freeskiRichardPermin',
title: 'Heli Skiing [heliskiing] & Freeride Ski by French Freeskier',
height: 270,
width: 480,
html: '<iframe width="480" height="270" src="http://www.youtube.com/embed/RjHFOXTvqaA?feature=oembed" frameborder="0" allowfullscreen></iframe>',
thumbnail_height: 360
thumbnail_width: 480,
thumbnail_url: 'http://i3.ytimg.com/vi/RjHFOXTvqaA/hqdefault.jpg',
}
*/

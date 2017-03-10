import '../css/app.scss'
import $ from "jquery"
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import Instafeed from 'instafeed.js'
import request from 'request'
import spectragram from 'spectragram'



$(document).ready(() => {
  $('#fetchHashTag').click(() => {
    const hashtag = $('#hashtag').val()
    if(hashtag && hashtag !== '') {
      window.location.replace(`https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=http://localhost:8080?hashtag=${hashtag}&response_type=token&scope=public_content`)
    }
  })

  var Spectra = {
    instaToken: accesToken,
    instaID: clientId,
    init: function () {
      $.fn.spectragram.accessData = {
        accessToken: this.instaToken,
        clientID: this.instaID
      };
    }
  }
  Spectra.init();

  const { hashtag } = QueryString
  if (hashtag) {
    $('.feed-container').spectragram('getRecentTagged',{
      query: hashtag,
      wrapEachWith: '<div class="item">',
      size: 'big',
      complete: (data) => {
        $('#myCarousel').addClass('carousel')
        $('.item').first().addClass('active')
        $('.item').each((index, element) => {
          const imageTitle = $(element).find('img').attr('alt')
          jQuery(element).append(`<div class="carousel-caption">${imageTitle}</div>`)
        })
      },
    })
  }
})

var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();

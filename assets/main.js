
$(document).ready(function() {
    // Click
    $('.has-child > a').on('click', function(event) {
      event.preventDefault();

      $(this).parent().toggleClass('active');
    });

    // Run through slideshow
    $(window).on('load resize', function() {
        
        $('.slideshow img').css('max-height','none');

        var sizes = [];
        $('.slideshow img').each(function() {
          sizes.push($(this).height());
        });
        var minsize = Math.min.apply(null, sizes);
        $('.slideshow img').css('max-height',minsize+"px");

    });
    $(function() {
      // This is a bit silly - but medium has CORS.
      var $content = $(".blogroll");
      var data = {
        rss_url: "https://medium.com/feed/the-quantum-resistant-ledger",
      };
      $.get("https://api.rss2json.com/v1/api.json", data, function(response) {
        if (response.status === "ok") {
          var output = "";
          $.each(response.items, function(k, item) {
            output += "<div class=\"blog-card\">";
            // output += "<h4 class=\"date\">" + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";

            
            // output += "<div class=\"ui fluid image\"><a href=\"" + item.link + "\"><img src=\"" + src + "\"></a></div>";
            output += "<div class=\"title\"><h2><a href=\"" + item.link + "\">" + item.title + "</a></h2></div>";
            output += "<div class=\"author\"><span>By " + item.author + "</span></div>";

            // console.log(output);
            var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
            var html = yourString;
            var div = document.createElement("div");
            div.innerHTML = html;
            var text = div.textContent || div.innerText || "";
            yourString = text;

            if (k==0) {
              var maxLength = 600; // maximum number of characters to extract
            } else {
              var maxLength = 120;
            }


            var sentence_index= 0;
            // var sentences_index = yourString.indexOf('. ');

            while (yourString.substr(0, sentence_index).length < maxLength) {
              sentence_index = yourString.indexOf('.', sentence_index+1);
            }

            var trimmedString = yourString.substr(0, sentence_index);            

            // //trim the string to the maximum length
            // var trimmedString = yourString.substr(0, maxLength);

            // //re-trim if we are in the middle of a word
            // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
            


            output += "<p>" + trimmedString + ".</p>";
            output += "<div><a class='cta' href=\""+item.link+"\">Read More</a></div>"
            output += "</div>";
            return k < 2;
          });
          $content.html(output);
        }
      });
    });
    
  });
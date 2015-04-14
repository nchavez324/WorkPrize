

$(document).on("pageinit", function() {
  
  /*
        $("#rewardtiles").hide();
        // Basic usage
        $(".placepicker").placepicker();

        // Advanced usage
        $("#advanced-placepicker").each(function() {
          var target = this;
          var $collapse = $(this).parents('.form-group').next('.collapse');
          var $map = $collapse.find('.another-map-class');

          var placepicker = $(this).placepicker({
            map: $map.get(0),
            placeChanged: function(place) {
              console.log("place changed: ", place.formatted_address, this.getLocation());
            }
          }).data('placepicker');
        });
*/
      }); // END document.ready

function openReward() {
  $("#rewardtiles").toggle();
}

function Cookies() {
            $("#rewardtiles").toggle();
            $("#possiblereward").val("Cookie");
        }
        function Tea() {
            $("#rewardtiles").toggle();
            $("#possiblereward").val("Tea");
        }
        function Massage() {
            $("#rewardtiles").toggle();
            $("#possiblereward").val("Massage");
        }
        function iceCream() {
            $("#rewardtiles").toggle();
            $("#possiblereward").val("Ice cream");
        }
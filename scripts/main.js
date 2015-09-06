(function(){
  'use strict';

  $(document).ready(function(){

  //// Hide Company Input field on page load / Show on click of Radio button
    $("#shipping-company").hide();
      $("#commercial").click(function(){
        $("#shipping-company").show();
    });

  });
})();

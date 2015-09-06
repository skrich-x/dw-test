(function(){
  'use strict';

  $(document).ready(function(){

    //// Hide Company Input field on page load / Show on click of Radio button ////
    $("#shipping-company").hide();
      $("#commercial").click(function(){
        $("#shipping-company").show();
    });

    ///Validate Number Keypress For Phone Number - 10 Character MAX///
    $("#phone").attr('maxlength','10');
    $("#phone").keypress(function (event) {
      return  /\d/.test(String.fromCharCode(event.keyCode));
    });

    ///Validate Number Keypress For Zip -- 5 Character MAX///
    $("#zip").attr('maxlength', '5');
    $("#zip").keypress(function (event) {
      return  /\d/.test(String.fromCharCode(event.keyCode));
    });


    //// Use jquery validation to create rules and messages objects ////

    $("#shipping-form").validate({
      rules: {
        ///confirm email is valid and confirmation matches///
        email_address: {
          required: true,
          email: true
        },

        email_address_confirm: {
          required: true,
          email: true,
          equalTo: "#emailAddress"
        },

        phone: {
          required: true,
          phoneUS: true
        },

        /// Other Required Fields ///
        first_name:"required",
        last_name:"required",
        address_1:"required",
        city:"required",
        zip:"required",
      },

      /// Define error messages if left blank or is invalid
      messages: {
        email: {
          email: "Please Enter a Valid Email"
        },

        email_address_confirm: {
          required: "Must Confirm Email",
          email_address_confirm: "Emails Must Match"
        },

        first_name:"Please enter your first name.",
        last_name:"Please enter your last name.",
        address_1:"Please provide your address.",
        city: "Please provide your city.",
        zip: "Please provide your Zip Code.",
        phone: "Please provide a valid US phone number"
      }
    });

    //// Use Map to get New array of form values.
    var formValues = $("input").map(function(){
      return $(this).val();
      }).get();
    /// Console Log array created with map method.
      console.log(formValues);

  });
})();

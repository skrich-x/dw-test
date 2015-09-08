(function(){
  'use strict';

$(document).ready(function(){
    var state = $("select.state").val();

    // $("select.state").blur(function(state){
    //   if (state === "NY" || state === "CA" || state === "MA" || state === "PA" || state === "MD"){
    //       $(".submit-button").prop("disabled",true);
    //     }
    // });

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

    ///Prevent Cut Copy Paste on email conformation///
    $('#email_address_confirm').bind("cut copy paste",function(e) {
      e.preventDefault();
    });

    $.validator.setDefaults({
      errorElement: 'div'
    });

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
          equalTo: "#email_address"
        },

        phone: {
          required: true,
          phoneUS: true
        },


        /// Other Required Fields ///
        first_name: {
          required: true,
        },
        last_name: {
          required: true,
        },
        address_1: {
          required: true,
        },
        city: {
          required: true,
        },
        zip: {
          required: true,
        },

      },

      /// Define error messages if left blank or is invalid
      messages: {
        email_address: {
          email: "Please Enter a Valid Email"
        },
        email_address_confirm: {
          required: "Must Confirm Email",
          email_address_confirm: "Emails Must Match"
        },
        first_name: {
          required: "Please enter your first name."
        },
        last_name: {
          required: "Please enter your last name."
        },
        address_1: {
          required: "Please provide your address."
        },
        city: {
          required: "Please provide your city."
        },
        zip: {
          required: "Please provide your Zip Code."
        },
        phone: {
          required: "Please provide a valid US phone number"
        }
      },

      submitHandler: function(){
      /// Get Value of selected state here ///
          var state = $("select.state").val();
          console.log(state);
            /// If state is invalid shipping State ///
            if (state === "NY" || state === "CA" || state === "MA" || state === "PA" || state === "MD"){
                alert("Due to State Law we are unable to ship to this state, at this time. We apoligize for any inconvenience ");
            }else{
              //// Use Map to get New array of form values ///
            var formValues = $("input").map(function(){
              return $(this).val();
            }).get();

            /// Insert state in existing mapped array @ specific Index ///
            formValues.splice(7, 0, state);

            /// Console Log new array  ///
            console.log(formValues);
          }
        }

      });
    });

})();

"use strict";

(function () {
  'use strict';

  $(document).ready(function () {
    var state = $("select.state").val();

    //// Hide Company Input field on page load / Show on click of Checkbox ////
    $("#shipping-company").hide();
    $("#commercial").click(function () {
      $("#shipping-company").toggle();
    });

    ///Validate Number Keypress For Phone Number - 10 Character MAX///
    $("#phone").attr('maxlength', '10');
    $("#phone").keypress(function (event) {
      return (/\d/.test(String.fromCharCode(event.keyCode))
      );
    });

    ///Validate Number Keypress For Zip -- 5 Character MAX///
    $("#zip").attr('maxlength', '5');
    $("#zip").keypress(function (event) {
      return (/\d/.test(String.fromCharCode(event.keyCode))
      );
    });

    ///Prevent Cut Copy Paste on email conformation///
    $('#email_address_confirm').bind("cut copy paste", function (e) {
      e.preventDefault();
    });

    ///Set Validator error to Div///
    $.validator.setDefaults({
      errorElement: 'div'
    });

    ///Use jquery validate to create rules and messages objects///
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
          required: true
        },
        last_name: {
          required: true
        },
        address_1: {
          required: true
        },
        city: {
          required: true
        },
        zip: {
          required: true
        }

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

      ///Handling submit action through jquery validate///

      submitHandler: function submitHandler() {
        /// Get Value of selected state here ///
        var state = $("select.state").val();
        console.log(state);
        /// If state is invalid shipping State ///
        if (state === "NY" || state === "CA" || state === "MA" || state === "PA" || state === "MD") {
          alert("Due to State Law we are unable to ship to this state, at this time. We apoligize for any inconvenience ");
        } else {
          //// Use Map to get New array of form values ///
          var formValues = $("input").map(function () {
            return $(this).val();
          });

          /// Insert state in existing mapped array @ specific Index ///
          formValues.splice(7, 0, state);

          /// Replace form with form input ///
          $("#shipping-form").replaceWith("<div class='thankyou'>" + "<h1>" + "Thank You for Submitting you Info!!" + "</h1>" + "<h1>" + [formValues[2]] + " " + [formValues[3]] + "</h1>" + "<h1>" + [formValues[4]] + "</h1>" + "<h1>" + [formValues[5]] + [formValues[7]] + " " + [formValues[8]] + "</h1>" + "<h1>" + [formValues[9]] + "</h1>" + "</div>");

          /// Console Log new array  ///
          console.log(formValues);
        }
      }
    });
  });
})();
//# sourceMappingURL=main.js.map
// $( document ).ready() {
//     console.log("READY")
// };

// General toggle
function toggleTarget(target) {
  	$("[data-toggle='" + target + "']").toggleClass("active");
}

// Accordion
function toggleAccordion(target) {
	$("[data-toggle='" + target + "']")
		.siblings()
		.removeClass("active");
	$("[data-toggle='" + target + "']")
		.siblings()
		.find(".content")
		.slideUp();

	$("[data-toggle='" + target + "']").toggleClass("active");
	$("[data-toggle='" + target + "']")
		.find(".content")
		.slideToggle();
}

$("#contact__form").validate({
	ignore: "",
	rules: {
		name: "required",
		phone: {
			digits: true
		}
	},
	messages: {
		name: "Mensaje de error",
	},
	highlight: function (element) {
		$(element).addClass('error');
		$(element).parent('div').addClass('error');
	},
	unhighlight: function (element) {
		$(element).removeClass('error').addClass('success');
		$(element).parent('div').removeClass('error').addClass('success');

	},
	submitHandler: function (form) {
		$("#contact__form button").attr("disabled", true);
		$("#contact__form button").text("Enviando");
		// $("#contact__form").ajaxSubmit({
		//   dataType: "json",
		//   success: function (data) {},
		// });
	},
});

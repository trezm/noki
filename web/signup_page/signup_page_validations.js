var init = function(app) {
	var validations = {
		'first': [
			function(field) {
				return field.value.length > 0 ? null : "Must include a first name.";
			}
		],

		'last': [
			function(field) {
				return field.value.length > 0 ? null : "Must include a last name.";
			}
		],
		'email': [
			function(field) {
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(field.value) ? null : "Must include a valid email.";
			}
		],
		'password': [
			function(field) {
				return field.value.length >= 8 ? null : "Password must be greater than 7 characters.";
			}
		],
		'passwordConfirmation': [
			function(field) {
				return field.value.length >= 8 ? null : "Password confirmation must be greater than 7 characters."
			},
			function(field) {
				return signupForm.password.value == field.value ? null : "Password confirmation must match password.";
			}			
		],
	};

	return {
		validateForm: function(form) {
			var errors = [];

			for (var i = 0; i < form.elements.length; i++) {
				var field = form.elements[i];

				var error = this.validateField(field);
				if (error) {
					errors = errors.concat(error);
				}
			}

			return errors;
		},

		validateField: function(field) {
			var errors = []

			if (!validations[field.name]) {
				return null;
			}

			for (var i = 0; i < validations[field.name].length; i++) {
				var error = validations[field.name][i](field);
				if (error) {
					errors = errors.concat(error);
				}
			}

			if (errors.length > 0) {
				field.className += " invalid-field";
				return errors;
			} else {
				field.className = field.className.replace(/invalid\-field/g, "");
				return null;
			}
		}
	}
}

if (module) {
	module.exports = init;
} else {
	init(app);
}
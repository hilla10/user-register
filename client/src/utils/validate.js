const validateForm = (formData, setInputError, isUpdate = false) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors = {};

  if (isUpdate) {
    // Validate email format
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email format';
    }

    // Validate password length (only if password is provided)
    if (formData.password && formData.password.length < 6) {
      errors.password = 'The password must be at least 6 characters long.';
    }
  } else {
    // For registration, validate all fields strictly
    if (!formData.username.trim()) {
      errors.username = 'The username field is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'The email field is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email format';
    }

    if (!formData.password.trim()) {
      errors.password = 'The password field is required';
    } else if (formData.password.length < 6) {
      errors.password = 'The password must be at least 6 characters long.';
    }
  }

  setInputError(errors);

  return Object.keys(errors).length === 0;
};

export default validateForm;

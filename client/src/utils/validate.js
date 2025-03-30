const validateForm = (formData, setInputError) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors = {};

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

  setInputError(errors);

  // If there are no errors, return true
  return Object.keys(errors).length === 0;
};

export default validateForm;

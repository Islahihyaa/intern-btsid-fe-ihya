export const handleSuccess = (
  successMessage,
  resetMessage,
  resetForm,
  setLoading
) => {
  resetMessage();
  successMessage.value = "Please check your email!";
  resetForm();
  setLoading(false);
};

export const handleError = (
  error,
  setLoading,
  resetMessage,
  errorMessages,
  resetForm
) => {
  if(setLoading) setLoading(false);
  resetMessage();

  if (error.message) {
    errorMessages.value = [formatErrorMessage(error.message)];
  } else if (error.error && error.error.message) {
    errorMessages.value = [formatErrorMessage(error.error.message)];
  } else {
    errorMessages.value = ["An error occurred. Please try again later.", error];
  }
  resetForm();
};

export const formatErrorMessage = (message) => {
  if (message.includes("Invalid email")) {
    return "Invalid Email Format";
  }
  return message;
};

export const resetMessage = (successMessage, errorMessages) => {
  if(successMessage) successMessage.value = "";
  if(errorMessages) errorMessages.value = [];
};

export const setLoading = (loading, value) => {
  if(loading) loading.value = value;
};

export const resetForm = (...fields) => {
  fields.forEach((field) => {
    field.value = "";
  });
};

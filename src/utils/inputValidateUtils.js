export const checkOnEmptyInput = (value) => {
  try {
    if (typeof value === 'string') {
      return value.replace(/^\s+/g, '').length > 0;
    } else {
      throw new Error('ERROR: "Value" is not a string');
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};

export const checkOnValidEmail = (email) => {
  try {
    if (typeof email === 'string') {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email.trim()).toLowerCase());
    } else {
      throw new Error('ERROR: "Value of email" is not a string');
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
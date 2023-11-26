/* eslint-disable no-useless-escape */
const phoneRegex = /^[0-9]{10}$/; // max length 10 characters
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // example@example.com

export default {
  phoneRegex,
  emailRegexp,
};

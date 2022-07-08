export const validationMessage = {
  fieldReq: `This field is required.`,
  emailInvalid: `Email address is not valid.`,
  urlInvalid: `URL is not valid.`,
  invalidValue: `This field is invalid`,
  onlyNumber: `This field should contains only number.`,
  passLength: `Password must be 8 characters long.`,
  nameInvalid: (length = 1) => `This field should contains only character and should be at least ${length} characters.`,
  textInvalid: (length = 1) => `This field should be at least ${length} characters long.`,
  numberInvalid: (length = 1) => `This field should be at least ${length} digit long.`,
  textMaxInvalid: (length = 50) => `Max characters allowed is ${length} characters.`,
  numberMaxInvalid: (length = 50) => `Max characters allowed is ${length} digit.`,
  nameLength: `This field should contains only character and should be at least 4 characters.`,
  confirmMsg: `New passsword and Confirm password must be same.`,
  mobile: `Mobile number is not valid`,
}


/* export const validation = {
  validateEmail: val => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    );
  },
  validateMultipleEmail: val => {
    return /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/.test(
      val
    );
  },
  validateMobile: val => {
    return /^\+?\d{9,12}$/.test(val);
  },

  validateFreeSpace: val => {
    return /^$|^[^\s]+(\s+[^\s]+)*$/.test(val);
  },
  validateMobileWithoutCC: val => {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(
      val
    );
  },
  validateString: val => {
    return /^\S[a-zA-Z\x20]{0,25}$/.test(val);
  },
  validatePassword: val => {
    return /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[\s0-9!@#$%^~&*-_^"^'^=^*^`^@^#^%^&^(^)^!^:^;^?^/^.^{^}^<^>^,^\\])[\sA-Za-z0-9!@#~$%^&*-_^"^'^`^*^@^#^%^&^(^)^{^}^!^=^:^;^?^/^<^>^.^,^\\]{8,100}$/.test(
      val
    );
    // return /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*_])[A-Za-z0-9!@#$%^&*_]{8,15}$/.test(val);
  },
  validateNumbers: val => {
    return /^[0-9]{0,}$/.test(val);
  },
  validateInteger: val => {
    return /^\d*[1-9]\d*$/.test(val);
  },
  validateURL: url => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url
    );
  },
  validatePrice: val => {
    return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
  },
  validateAlphaNumberic: val => {
    return /^[a-zA-Z0-9]{0,20}$/.test(val);
  },
  getNumbericValuesFromString: val => {
    return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
  }
}; */
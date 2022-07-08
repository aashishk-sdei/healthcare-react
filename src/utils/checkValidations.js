export const checkValidations = (name, value, min = 4, max = 100) => {
  switch (name) {
    case 'email':
      // return (/^[a-zA-Z0-9]+.+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) && value.length > 0 ? true : false;
      return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) && value.length > 0 ? true : false;
    case 'password': {
      return (value.length >= 8) ? true : false;
    }
    case 'text':
      return (value.length >= min && value.length <= max) ? true : false;
    case 'number':
      return (/^[0-9]*$/.test(value) && value.length >= min && value.length <= max) ? true : false;
    case 'name':
      // return (/^[a-zA-Z][a-zA-Z\s]*$/.test(value) && value.length >= min && value.length <= max) ? true : false;
      return (value.length >= min && value.length <= max) ? true : false;
    case 'url':
      return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value)) && value.length > 0 ? true : false;

    // return (/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(value)) && value.length > 0 ? true : false;
    // return (/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) && value.length > 0 ? true : false;
    // return (/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)) && value.length > 0 ? true : false;

    default:
      return false;
  }
}



// {
//   const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(value).toLowerCase());
//   console.log("emailformat: ", emailformat);
//   return value.match(emailformat) && value.length > 0 ? true : false;
// }
import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
  secretKey: 'my-super-secret-admin-key'
});

export default encryptor;
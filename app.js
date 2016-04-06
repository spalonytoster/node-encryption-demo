// Nodejs encryption with CTR
var token = require('rand-token'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'mypassword1234';

// Generate a 16 character alpha-numeric token:
var generatedToken = token.generate(16);
console.log('generatedToken: ' + generatedToken);

var encrypt = function (text, token) {
  var cipher = crypto.createCipher(algorithm, token);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}

var decrypt = function (text, token) {
  var decipher = crypto.createDecipher(algorithm, token);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}

// Encrypt password
var encryptedPassword = encrypt(password, generatedToken);
console.log('encryptedPassword: ' + encryptedPassword);

// Decrypt password
var decryptedPassword = decrypt(encryptedPassword, generatedToken);
console.log('decryptedPassword: ' + decryptedPassword);

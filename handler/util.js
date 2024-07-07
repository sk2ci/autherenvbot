const {createCipheriv, createDecipheriv} = require("crypto");
const { readFileSync } = require("fs");
const key = readFileSync("key")
const Iv = readFileSync("iv")
function encrypt(text) {
    let cipher = createCipheriv('aes-256-cbc',key, Iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}
module.exports.encrypt = encrypt
function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = createDecipheriv('aes-256-cbc', key, Iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
module.exports.decrypt = decrypt
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
module.exports.shuffle = shuffle
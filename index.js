const regex1 = new RegExp('1', 'g')
const regex0 = new RegExp('0', 'g')
const regexEmoji = new RegExp('😁', 'g')
const regexDot = new RegExp('\\.', 'g')
const regexGrin = new RegExp(':grin:','g')
const rickrollLink = "youtu.be/dQw4w9WgXcQ"
const longRickrollLink = "youtube.com/watch?v=dQw4w9WgXcQ"

function mysterizeString(inputstr)
{
    return inputstr.replace(regex1, '😁').replace(regex0, '.')
}

function demysterizeString(inputstr)
{
    return inputstr.replace(regexEmoji, '1').replace(regexDot, '0')
}

function encrypt(value)
{
    let binaryResult = text2bin(value)
    return mysterizeString(binaryResult)
}

function decrypt(value)
{
    let binary = demysterizeString(value)
    return bin2text(binary)
}

function dec2bin(a) {
    return Number(parseInt(a, 10)).toString(2)
}

function bin2dec(a) {
    return parseInt(a, 2)
}
function bin2hex(a) {
    return Number(parseInt(a, 2)).toString(16)
}

function hex2bin(a) {
    return Number(parseInt(a, 16)).toString(2)
}

function buildOctet(a) {
    for (var d = 8 - a.length, b = 0; b < d; b += 1)a = "0" + a;
    return a
}

function text2bin(a) {
    for (var d = "", b = [], c = a.length, b = "", e = 0; e < c; e += 1)b = encodeURIComponent(a.charAt(e)).split("%"), 2 < b.length ? (b = b[1] + b[2], d += hex2bin(b)) : d += buildOctet(dec2bin(a.charCodeAt(e)));
    return d
}

function bin2text(a) {
    for (var d = a.length >> 3, b = [], c = 0; c < d; c += 1)b[c] = a.substr(c << 3, 8);
    a = b.length;
    d = "";
    for (c = 0; c < a; c += 1)if ("110" === b[c].substr(0, 3)) {
        try {
            d += decodeURIComponent("%" + bin2hex(b[c]) + "%" + bin2hex(b[c + 1]))
        } catch (e) {
            continue
        }
        c += 1
    } else d += String.fromCharCode(bin2dec(b[c]));
    return d
};
function checkRickRoll(text) {
    if (text == rickrollLink || text == "www."+rickrollLink || text==longRickrollLink || text=="www."+longRickrollLink)
        window.open("https://"+rickrollLink, '_blank').focus();
    if (text == "https://"+rickrollLink || text == "https://www."+rickrollLink || text=="https://"+longRickrollLink || text=="www.https://"+longRickrollLink || text == "http://"+rickrollLink || text == "http://www."+rickrollLink || text=="http://"+longRickrollLink || text=="http://www."+longRickrollLink)
        window.open(text, '_blank').focus()
}

document.querySelector("#decryptBtn").addEventListener("click",()=>{
    let decryptedText = decrypt(document.querySelector("#textToDecrypt").value);
    let resultField = document.querySelector("#textToEncrypt");
    resultField.focus();
    checkRickRoll(decryptedText);
    resultField.value = decryptedText;
})

document.querySelector("#encryptBtn").addEventListener("click",()=>{
    let encryptedText = encrypt(document.querySelector("#textToEncrypt").value);
    let resultField = document.querySelector("#textToDecrypt");
    resultField.focus();
    resultField.value = encryptedText
})

document.querySelector("#textToDecrypt").addEventListener("input",()=>{
    let field = document.querySelector("#textToDecrypt");
    field.value = field.value.replace(regexGrin,"😁");
})
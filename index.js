const regex1 = new RegExp('1', 'g')
const regex0 = new RegExp('0', 'g')
const regexEmoji = new RegExp('😁', 'g')
const regexDot = new RegExp('\\.', 'g')
const regexGrin = new RegExp(':grin:','g')
const regexRickroll = new RegExp(/youtu\.{0,1}be.+dQw4w9WgXcQ$/gm)
const rickrollLink = "https://youtu.be/dQw4w9WgXcQ"

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
    for (var d = "", b = [], c = a.length, b = "", e = 0; e < c; e += 1){
        let val = a.charAt(e)
        if(val === '\ud83d'){
            let nextVal = a.charAt(e + 1)
            if(nextVal === '\ude01')
            {
                val += nextVal
                e++
            }
        }

        b = encodeURIComponent(val).split("%"), 2 < b.length ? (b = b[1] + b[2], d += hex2bin(b)) : d += buildOctet(dec2bin(a.charCodeAt(e)));
    }
    return d
}

function bin2text(a) {
    for (var d = a.length >> 3, b = [], c = 0; c < d; c += 1){
        b[c] = a.substr(c << 3, 8);
    }
    a = b.length;
    d = "";
    for (c = 0; c < a; c += 1){
        if ("110" === b[c].substr(0, 3)) {
            try {
                d += decodeURIComponent("%" + bin2hex(b[c]) + "%" + bin2hex(b[c + 1]))
            } catch (e) {
                continue
            }
        c += 1
        } 
        else if(b[c] == "11110000" && b[c + 1] == "10011111"){
            d += '😁'
            c++
        }
        else{
            d += String.fromCharCode(bin2dec(b[c]));
        }
    }
    return d
};
function checkRickRoll(text) {
    if (text.match(regexRickroll))
        window.open(rickrollLink,"_blank");
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

document.querySelectorAll(".copy-result-btn").forEach(btn => btn.addEventListener("click", (event) => {
    let inputId = event.target.getAttribute("textAreaId")
    let input = document.querySelector('#' + inputId)
    navigator.clipboard.writeText(input.value)
}))
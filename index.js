const regex1 = new RegExp('1', 'g')
const regex0 = new RegExp('0', 'g')
const regexEmoji = new RegExp('😁', 'g')
const regexDot = new RegExp('\\.', 'g')

function mysterizeString(inputstr)
{
    return inputstr.replace(regex1, '😁').replace(regex0, '.')
}

function demysterizeString(inputstr)
{
    return inputstr.replace(regexEmoji, "1").replace(regexDot, '0')
}

function encrypt(value)
{
    let binaryResult = encryptBinary(value)
    return mysterizeString(binaryResult)
}

function decrypt(value)
{
    let binary = demysterizeString(value)
    return decryptBinary(binary)
}

function decryptBinary(value)
{
    var newBin = value.split(" ");
    var binCode = [];
    
    for (i = 0; i < newBin.length; i++) {
        binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
      }
    return binCode.join("");
}

function encryptBinary(value)
{
    let result = ""
    for (i = 0; i < value.length; i++) {
        result += value[i].charCodeAt(0).toString(2) + " "
    }

    return result
}
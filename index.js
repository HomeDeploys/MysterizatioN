function mysterizeString(inputstr)
{
    return inputstr.replaceAll("1", "😁").replaceAll("0", ".")
}

function demysterizeString(inputstr)
{
    return inputstr.replaceAll("😁", "1").replaceAll(".", "0")
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
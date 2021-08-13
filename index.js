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

}

function encryptBinary(value)
{

}
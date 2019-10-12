var b64hash = {
  'A':"000000", 'B':"000001", 'C':"000010", 'D':"000011", 'E':"000100", 'F':"000101",
  'G':"000110", 'H':"000111", 'I':"001000", 'J':"001001", 'K':"001010", 'L':"001011",
  'M':"001100", 'N':"001101", 'O':"001110", 'P':"001111", 'Q':"010000", 'R':"010001",
  'S':"010010", 'T':"010011", 'U':"010100", 'V':"010101", 'W':"010110", 'X':"010111",
  'Y':"011000", 'Z':"011001",
  'a':"011010", 'b':"011011", 'c':"011100", 'd':"011101", 'e':"011110", 'f':"011111",
  'g':"100000", 'h':"100001", 'i':"100010", 'j':"100011", 'k':"100100", 'l':"100101",
  'm':"100110", 'n':"100111", 'o':"101000", 'p':"101001", 'q':"101010", 'r':"101011",
  's':"101100", 't':"101101", 'u':"101110", 'v':"101111", 'w':"110000", 'x':"110001",
  'y':"110010", 'z':"110011", '0':"110100", '1':"110101", '2':"110110", '3':"110111",
  '4':"111000", '5':"111001", '6':"111010", '7':"111011", '8':"111100", '9':"111101",
  '+':"111110", '/':"111111"
};

function processBase64Decoding(encodedContent)
{
  var decodedBinaryString="";
  var decodedPlainContent="";

  for (var i = 0; i < encodedContent.length; i++)
  {
    if (encodedContent[i] !== "=")
    {
      decodedBinaryString += b64hash[encodedContent[i]];
    }
  }

  var j=0;
  while( (j*8+8) <= decodedBinaryString.length)
  {
    var startIndex = j*8;
    c=decodedBinaryString.substring(startIndex,startIndex+8 + "\n");
    j++;
    console.log(c);
    console.log(parseInt(c,2));
    console.log( String.fromCharCode(parseInt(c,2)) );
    decodedPlainContent += String.fromCharCode(parseInt(c,2));
    console.log(decodedPlainContent);
  }
  $("#plainContent").val(decodedPlainContent);
  console.log("Length of: " + decodedBinaryString + " is " + decodedBinaryString.length);
}

function processBase64Encoding(plainContent)
{
  var reverseb64hash = {};
  for (var encodedChar in b64hash)
  {
      reverseb64hash[b64hash[encodedChar]] = encodedChar;
  }
  console.log(reverseb64hash);

  var plainContentBinaryString = ""
  for(var i = 0; i < plainContent.length; i++)
  {
    c = plainContent.charCodeAt(i).toString(2);
    if(c.length < 8)
    {
      for(var j = c.length; j < 8; j++ )
      {
        c = "0" + c;
      }
    }
    console.log(c);
    plainContentBinaryString += c;
  }
  console.log(plainContentBinaryString);
  console.log("Length of: " + plainContentBinaryString + " is " + plainContentBinaryString.length);

  var encodedString = ""
  var currSegment = 0;
  while (currSegment*6 < plainContentBinaryString.length)
  {
    currSegmentStartIndex = currSegment*6;
    //There is at lease one full b64 character value left
    if(currSegmentStartIndex + 6 < plainContentBinaryString.length)
    {
      encodedString += reverseb64hash[plainContentBinaryString.substr(currSegmentStartIndex, 6)];
    }
    else
    {
      remainder = plainContentBinaryString.substr(currSegmentStartIndex);
      for(k=remainder.length;k<6;k++)
      {
        remainder += "0";
      }
      encodedString += reverseb64hash[remainder];
    }
    currSegment++
  }
  while(encodedString.length%4 !== 0)
  {
    encodedString += "=";
  }
  console.log(encodedString);
  $("#encodedContent").val(encodedString);
}

function displayb64hash()
{
  var refString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var returnVal="";
  returnVal += "{\n";
  for (var i=0; i < refString.length; i++) {
    returnVal += "\t'" + refString[i] + "':\"" + b64hash[refString[i]] + "\",\n";
  }
  returnVal += "}";
  return returnVal;
}

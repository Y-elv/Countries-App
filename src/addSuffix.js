function splitIn2(str, resultingArr) {
  const sub1 = str.slice(0, str.length - 3);
  const sub2 = str.slice(str.length - 3);
  resultingArr.unshift(sub2);

  if (sub1.length > 3) return splitIn2(sub1, resultingArr);
  resultingArr.unshift(sub1);
  return resultingArr;
}

function addCommas(num) {
  const popInStr = typeof num === 'number' ? num.toString() : num;
  if (popInStr.length <= 3) return popInStr;
  const toBeJoined = [];

  splitIn2(popInStr, toBeJoined);
  let result = toBeJoined.join(',');

  const indexOfPeriod = result.indexOf(',');
  const floatingPoint = 2;
  result = result.replace(',', '.').slice(0, indexOfPeriod + floatingPoint + 1);

  return result;
}

export default function addSuffix(num) {
  let numInStr = num.toString();
  if (num < 1000) return num;
  numInStr = addCommas(numInStr);
  if (num < 10 ** 6) numInStr += 'K';
  else if (num < 10 ** 9) numInStr += 'M';
  else if (num < 10 ** 12) numInStr += 'B';
  return numInStr;
}

function rot13(str) {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const shiftedAbc = "NOPQRSTUVWXYZABCDEFGHIJKLM";
    let newStr = "";
  
    for (let i = 0; i < str.length; i++) {
      let indexInShiftedAbc = shiftedAbc.indexOf(str[i]);
      let convertedIndex = abc.charAt(indexInShiftedAbc);
  
      if (indexInShiftedAbc === -1) {
        newStr += str[i];
      } else {
        newStr += convertedIndex;
      }
      
    }
    return newStr;
  }
  
  rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
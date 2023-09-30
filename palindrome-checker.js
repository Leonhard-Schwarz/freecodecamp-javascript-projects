function palindrome(str) {
    str = str.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, "").split("");
  
    let strReverse = str.slice(0);
    strReverse = strReverse.reverse().join("");
    str = str.join("");
  
    if (strReverse === str) {
      return true;
    } else {
      return false;
    }
  }
  
  palindrome("eye");
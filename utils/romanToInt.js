const romanToInt = (s) => {
    const romanMap = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    };
    let result = 0;
    for (let i = 0; i < s.length; i++) {
      const current = romanMap[s[i]];
      const next = romanMap[s[i + 1]];
      if (current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };
  
  export default romanToInt;
  
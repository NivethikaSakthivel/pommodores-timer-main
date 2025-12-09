module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};

// // Or async function
// module.exports = async () => {
//   return {
//     verbose: true,
//   };
// };

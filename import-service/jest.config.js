module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
};

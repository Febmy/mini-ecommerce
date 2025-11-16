module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Hanya hitung coverage dari file util berikut
  collectCoverage: true,
  collectCoverageFrom: ["src/utils/cartUtils.js"],
  coverageDirectory: "coverage",
};

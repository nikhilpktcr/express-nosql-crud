export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};

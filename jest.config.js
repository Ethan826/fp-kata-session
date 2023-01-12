/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFilesAfterEnv: ["@relmify/jest-fp-ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};

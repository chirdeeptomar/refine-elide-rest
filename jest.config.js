module.exports = {
    preset: "ts-jest",
    rootDir: "./",
    name: "elide-rest",
    displayName: "elide-rest",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testEnvironment: "jsdom",
};

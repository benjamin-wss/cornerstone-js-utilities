const { EnvironmentVariables } = require("../index");

describe("EnvironmentVariables", () => {
  describe("getEnvVariableAsString", () => {
    test("Empty string fieldName should throw error", () => {
      expect(() => {
        EnvironmentVariables.getEnvVariableAsString({
          fieldName: "",
          defaultValue: null,
        });
      }).toThrow(
        "The fieldName value cannot be null and cannot have trailing or leading spaces."
      );
    });
    test("A fieldName with white space only should throw error", () => {
      expect(() => {
        EnvironmentVariables.getEnvVariableAsString({
          defaultValue: " ",
          fieldName: null,
        });
      }).toThrow();
    });
    test("A fieldName with leading white space should throw error", () => {
      expect(() => {
        EnvironmentVariables.getEnvVariableAsString({
          fieldName: " TEST_STRING",
          defaultValue: null,
        });
      }).toThrow(
        "The fieldName value cannot be null and cannot have trailing or leading spaces."
      );
    });
    test("A fieldName with trailing white space should throw error", () => {
      expect(() => {
        EnvironmentVariables.getEnvVariableAsString({
          fieldName: "TEST_STRING ",
          defaultValue: null,
        });
      }).toThrow(
        "The fieldName value cannot be null and cannot have trailing or leading spaces."
      );
    });
    test("A fieldName without a predefined default should throw error", () => {
      const fieldName = "TEST_STRING";
      expect(() => {
        EnvironmentVariables.getEnvVariableAsString({
          fieldName,
          defaultValue: null,
        });
      }).toThrow(
        `The environment variable ${fieldName} does not have a default value and is null, please provide a value or define a default value.`
      );
    });
  });
});

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
    test("A default value is set and should return the default value if no env var is supplied", () => {
      const value = EnvironmentVariables.getEnvVariableAsString({
        fieldName: "TEST_STRING",
        defaultValue: "TEST_STRING_VALUE",
      });
      expect(value).toBe("TEST_STRING_VALUE");
    });
    test("A default value is set and value is supplied via env var as an override, it should reflect the override.", () => {
      const value = EnvironmentVariables.getEnvVariableAsString({
        fieldName: "ENV_VAR_STRING_OVERRIDE_TEST",
        defaultValue: "TEST_STRING_VALUE",
      });
      expect(value).not.toBe("TEST_STRING_VALUE");
      expect(value).toBe(process.env.ENV_VAR_STRING_OVERRIDE_TEST);
    });
    test("If a valid value that matches the list in allowedValues, it is allowed", () => {
      const value = process.env.ALLOWED_VALUE_TEST_STRING;
      const allowedValues = ["foo", "bar"];

      const testCase = () => {
        return EnvironmentVariables.getEnvVariableAsString({
          fieldName: "ALLOWED_VALUE_TEST_STRING",
          allowedValues,
        });
      };

      expect(() => {
        testCase();
      }).not.toThrow(
        `Supplied value (${value}) is not allowed. Allowed values are [${allowedValues.join(
          ","
        )}].`
      );

      expect(testCase()).toEqual(value);
    });
    test("If an invalid value that matches the list in allowedValues, it throws", () => {
      const value = process.env.ALLOWED_VALUE_NEGATIVE_TEST_STRING;
      const allowedValues = ["foo", "bar"];
      expect(() => {
        EnvironmentVariables.getEnvVariableAsString({
          fieldName: "ALLOWED_VALUE_NEGATIVE_TEST_STRING",
          allowedValues,
        });
      }).toThrow(
        `Supplied value (${value}) is not allowed. Allowed values are [${allowedValues.join(
          ","
        )}].`
      );
    });
  });
});

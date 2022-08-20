const Yup = require("yup");
const moment = require("moment");

/**
 * Ensures that default values are present, if not, an error is thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {string} [param0.defaultValue] Environment variable field default value.
 * @param {string} [param0.value] Environment variable field value.
 */
function guardValuesArePresent({ fieldName, defaultValue, value }) {
  if (
    (value === null || value === undefined) &&
    (defaultValue === null || defaultValue === undefined)
  ) {
    throw new Error(
      `The environment variable ${fieldName} does not have a default value and is null, please provide a value or define a default value.`
    );
  }
}

/**
 * Get value from environment variable.
 * @param {string} fieldName Name of environment variable.
 * @returns {string|null}
 */
function getEnvVariableSync(fieldName) {
  if (Yup.string().required().min(1).isValidSync(process.env[fieldName])) {
    return process.env[fieldName];
  }

  return null;
}

/**
 * Gets environment variable as string.
 * If no default value is provided and no value is provided, an error will be thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {string} [param0.defaultValue] Environment variable field default value.
 * @returns {string}
 */
function getEnvVariableAsString({ fieldName, defaultValue }) {
  const value = getEnvVariableSync(fieldName);

  guardValuesArePresent({
    defaultValue,
    fieldName,
    value,
  });

  if (!value) {
    return defaultValue;
  }

  return value;
}

/**
 * Gets environment variable as integer.
 *
 * If no default value is provided and no value is provided, an error will be thrown.
 * If default value and/or value passed in is not an integer, an error will be thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {number} [param0.defaultValue] Environment variable field default value.
 * @param {number} [param0.minValue=0] Environment variable field default value.
 * @returns {number}
 */
function getEnvVariableAsInteger({ fieldName, defaultValue, minValue = 0 }) {
  const value = getEnvVariableSync(fieldName);

  guardValuesArePresent({
    defaultValue,
    fieldName,
    value,
  });

  const integerValidationSchema = Yup.number()
    .required()
    .integer()
    .min(minValue);

  if (!value) {
    const defaultValueIsInteger =
      integerValidationSchema.validateSync(defaultValue);

    if (!defaultValueIsInteger) {
      throw new Error(
        `The defaultValue passed in to environment variable ${fieldName} is not a valid integer. The defaultValue supplied: (${value}).`
      );
    }

    return defaultValue;
  }

  const isNumber = integerValidationSchema.isValidSync(value);

  if (!isNumber) {
    throw new Error(
      `The value passed in to environment variable ${fieldName} is not a valid integer. Value supplied: (${value}).`
    );
  }

  return Number.parseInt(value, 10);
}

function getEnvVariableAsDecimal({ fieldName, defaultValue, minValue = 0 }) {
  const validationSchema = Yup.number().required().min(minValue);

  const isDefaultValueValidNumber = validationSchema.isValidSync(defaultValue);

  if (!isDefaultValueValidNumber) {
    throw new Error(
      [
        `The default value supplied to environment variable (${fieldName}) is not a valid floating point number.`,
        `Number supplied is (${defaultValue}).`,
      ].join(" ")
    );
  }

  const defaultValueTyped = Number.parseFloat(defaultValue);

  const value = getEnvVariableSync(fieldName);

  guardValuesArePresent({
    defaultValue,
    fieldName,
    value,
  });

  if (!value) {
    return defaultValueTyped;
  }

  const isSuppliedValueValidNumber = validationSchema.isValidSync(value);

  if (!isSuppliedValueValidNumber) {
    throw new Error(
      `The environment value for (${fieldName}) is not a valid floating point number. Value provided is (${value})`
    );
  }

  return Number.parseFloat(value);
}

function getEnvVariableAsBoolean({ fieldName, defaultValue = false }) {
  const rawValue = getEnvVariableSync(fieldName);

  guardValuesArePresent({
    defaultValue,
    fieldName,
    value: rawValue,
  });

  if (rawValue === undefined || rawValue === null) {
    return defaultValue;
  }

  const value = getEnvVariableAsInteger({
    fieldName,
    defaultValue: !defaultValue ? 0 : 1,
  });

  // eslint-disable-next-line eqeqeq
  return value == 1;
}

function getEnvVariableAsDateString({
  fieldName,
  defaultValue,
  dateFormatMask = "YYYY-MM-DD",
}) {
  const value = getEnvVariableSync(fieldName);

  guardValuesArePresent({
    defaultValue,
    fieldName,
    value,
  });

  const valueAsMoment = moment(value, dateFormatMask);

  if (valueAsMoment.isValid()) {
    return value;
  }

  const defaultValueAsMoment = moment(defaultValue, dateFormatMask);
  const baseErrorMessage = `The environment variable ${fieldName} does not have a properly configured date string value with the format (${dateFormatMask}).`;

  if (!defaultValueAsMoment.isValid() && !valueAsMoment.isValid()) {
    throw new Error(
      [
        baseErrorMessage,
        `This applies to both default value and supplied value.`,
        `Please check the aforementioned field value both in code and in environment variable settings.`,
        `Supplied value is (${value})`,
        `Default value is (${defaultValue})`,
      ].join(" ")
    );
  }

  if (!defaultValueAsMoment.isValid()) {
    throw new Error(
      [
        baseErrorMessage,
        `It seems that no valid value was supplied via environment variables and the default value is also not a valid date.`,
        `The default value is (${defaultValue})`,
      ].join(" ")
    );
  }

  return defaultValue;
}

module.exports = {
  getEnvVariableAsString,
  getEnvVariableAsInteger,
  getEnvVariableAsBoolean,
  getEnvVariableAsDecimal,
  getEnvVariableAsDateString,
};

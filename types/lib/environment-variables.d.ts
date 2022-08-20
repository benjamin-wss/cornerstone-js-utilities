/**
 * Gets environment variable as string.
 * If no default value is provided and no value is provided, an error will be thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {string} [param0.defaultValue] Environment variable field default value.
 * @returns {string}
 */
export function getEnvVariableAsString({ fieldName, defaultValue }: {
    fieldName: string;
    defaultValue?: string;
}): string;
/**
 * Gets environment variable as integer.
 * If default value is provided but no value is provided, default value is used.
 * If no default value is provided and no value is provided, an error will be thrown.
 * If default value and/or value passed in is not an integer, an error will be thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {number} [param0.defaultValue] Environment variable field default value.
 * @param {number} [param0.minValue=0] Environment variable field default value.
 * @returns {number}
 */
export function getEnvVariableAsInteger({ fieldName, defaultValue, minValue }: {
    fieldName: string;
    defaultValue?: number;
    minValue?: number;
}): number;
/**
 * Gets environment variable as boolean.
 * If default value is provided but no value is provided, default value is used.
 * If no default value is provided and no value is provided, an error will be thrown.
 * If default value and/or value passed in is not an boolean, an error will be thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {number} [param0.defaultValue] Environment variable field default value.
 * @returns {number}
 */
export function getEnvVariableAsBoolean({ fieldName, defaultValue }: {
    fieldName: string;
    defaultValue?: number;
}): number;
/**
 * Gets environment variable as decimal.
 * If default value is provided but no value is provided, default value is used.
 * If no default value is provided and no value is provided, an error will be thrown.
 * If default value and/or value passed in is not an decimal, an error will be thrown.
 * @param {object} param0 Input parameters.
 * @param {string} param0.fieldName Environment variable field name.
 * @param {number} [param0.defaultValue] Environment variable field default value.
 * @param {number} [param0.minValue=0] Environment variable field default value.
 * @returns {number}
 */
export function getEnvVariableAsDecimal({ fieldName, defaultValue, minValue }: {
    fieldName: string;
    defaultValue?: number;
    minValue?: number;
}): number;
export function getEnvVariableAsDateString({ fieldName, defaultValue, dateFormatMask, }: {
    fieldName: any;
    defaultValue: any;
    dateFormatMask?: string;
}): any;
//# sourceMappingURL=environment-variables.d.ts.map
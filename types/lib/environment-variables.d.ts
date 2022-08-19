export function getEnvVariableAsString({ fieldName, defaultValue }: {
    fieldName: any;
    defaultValue: any;
}): any;
export function getEnvVariableAsInteger({ fieldName, defaultValue, minValue }: {
    fieldName: any;
    defaultValue: any;
    minValue?: number;
}): any;
export function getEnvVariableAsBoolean({ fieldName, defaultValue }: {
    fieldName: any;
    defaultValue?: boolean;
}): boolean;
export function getEnvVariableAsDecimal({ fieldName, defaultValue, minValue }: {
    fieldName: any;
    defaultValue: any;
    minValue?: number;
}): any;
export function getEnvVariableAsDateString({ fieldName, defaultValue, dateFormatMask, }: {
    fieldName: any;
    defaultValue: any;
    dateFormatMask?: string;
}): any;
//# sourceMappingURL=environment-variables.d.ts.map
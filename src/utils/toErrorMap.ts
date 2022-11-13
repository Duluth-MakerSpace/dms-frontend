import { FieldError } from "../graphql/graphql";

// Turn array of errors [{field: message}] to object of {field: message}
export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    })

    return errorMap;
}
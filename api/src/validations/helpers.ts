import { ValidationError } from 'class-validator';

export const createValidationErrors = (
  property: string, errorMessages: string[],
): ValidationError[] => {
  const errors: ValidationError[] = [];
  errorMessages.map((errorMessage) => {
    const error = new ValidationError();

    error.constraints = {
      [property]: errorMessage,
    };
    error.property = property;
    errors.push(error);
    return error;
  });
  return errors;
};

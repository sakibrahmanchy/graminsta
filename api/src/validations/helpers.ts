import { ValidationError } from 'class-validator';

/** Creating validation errors by formatting default errors.
 *
 * @param property
 * @param errorMessages
 */
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

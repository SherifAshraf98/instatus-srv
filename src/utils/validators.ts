export const validateNumberGreaterThanOrEqualOne = (number: string | undefined) =>
	number && !isNaN(+number) && +number >= 1;

export const validateString = (str: string) =>
	str?.match('^[0-9a-zA-Z ()-._@]{1,40}$')?.toString() === str ? str : undefined;

export const validateNumber = (number: string | undefined) => (number && !isNaN(+number) ? +number : undefined);

export const validateEnumType = (type: string | undefined, enumValues: any[]) =>
	enumValues.includes(type) ? type : undefined;

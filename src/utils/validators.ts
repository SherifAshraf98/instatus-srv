export const validateNumberGreaterThanOrEqualOneQP = (number: string | undefined) =>
	number && !isNaN(+number) && +number >= 1;

export const validateStringQP = (str: string) =>
	str?.match('^[0-9a-zA-Zs()-._@]{1,40}$')?.toString() === str ? str : undefined;

export const validateNumberQP = (number: string | undefined) => (number && !isNaN(+number) ? +number : undefined);

export const validateEnumTypeQP = (type: string | undefined, enumValues: any[]) =>
	enumValues.includes(type) ? type : undefined;

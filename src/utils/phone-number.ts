export const formatForPublish = (
  phoneNumber: string,
  countryCode = '501',
): string => {
  const basePhoneNumber = phoneNumber
    .replace(/-/g, '')
    .replace(new RegExp(countryCode, 'g'), '');

  return `${countryCode}${basePhoneNumber}`;
};

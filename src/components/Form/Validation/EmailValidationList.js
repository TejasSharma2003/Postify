import React, { memo, useMemo } from 'react';

const EmailValidationList = memo(() => {
  const emailValidation =
    'Allows alphanumeric characters, dots, hyphens, and underscores\n Username part Must have a domain name and a top-level domain (TLD) name\n TLD can be 2-63 characters long';

  const validationList = useMemo(
    () => emailValidation.split('\n'),
    [emailValidation]
  );

  return (
    <ul>
      {validationList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
});

export default EmailValidationList;

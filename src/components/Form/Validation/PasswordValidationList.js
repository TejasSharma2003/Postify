import React, { useMemo, memo } from 'react';

const PasswordValidationList = memo(() => {
  const passwordValidation =
    'Must be at least 8 characters long\n Must contain at least one uppercase letter, one lowercase letter, and one number\n May contain special characters';

  const validationList = useMemo(
    () => passwordValidation.split('\n'),
    [passwordValidation]
  );

  return (
    <ul>
      {validationList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
});

export default PasswordValidationList;

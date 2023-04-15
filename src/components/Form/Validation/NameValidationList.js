import React, { useMemo, memo } from 'react';

const UsernameValidationList = memo(() => {
  const usernameValidation =
    'Must be between 3 and 20 characters long\n Can only contain alphanumeric characters and underscores\n Must start with a letter';

  const validationList = useMemo(
    () => usernameValidation.split('\n'),
    [usernameValidation]
  );

  return (
    <ul>
      {validationList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
});

export default UsernameValidationList;

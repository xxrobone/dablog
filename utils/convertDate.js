import React from 'react';

export const convertDate = (inputDate) => {
  return new Date(inputDate).toLocaleString().substring(0, 10);
};

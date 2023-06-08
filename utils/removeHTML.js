import React from 'react';

export const removeHTML = (input) => {
  return input.replaceAll(/<\/?[^>]+(>|$)/gi, '');
};

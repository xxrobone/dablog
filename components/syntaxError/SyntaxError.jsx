import React from 'react';
import Image from 'next/image';
import GIF from '/public/images/syntaxErr.gif';

const SyntaxError = () => {
  return (
    <div>
      <Image
        src={GIF}
        priority
        height={175}
        width={175}
        alt={`syntax error`}
        unoptimized={true}
      />
    </div>
  );
};

export default SyntaxError;

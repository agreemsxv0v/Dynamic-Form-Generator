import React from 'react';

interface ValidationMessageProps {
  message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ message }) => (
  <p className="text-red-500">{message}</p>
);

export default ValidationMessage;

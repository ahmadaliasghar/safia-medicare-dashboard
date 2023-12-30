import React from 'react';

const ActionButton = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`px-2 py-1 border rounded ${type === "success" ? 'bg-blue-400' : 'bg-red-600'} text-white`} >
      {children}
    </button>
  );
};

export default ActionButton;

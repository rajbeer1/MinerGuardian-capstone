import React from 'react';

const DataBox = ({ title, value, units, icon }:any) => {
  const iconStyle = {
    margin: '0 10px',
    fontSize: '20px',
  };

  return (
    <div className="data-box bg-slate-700 text-white rounded flex items-center justify-between p-3">
      <div className="flex items-center">
        <span className="material-icons" style={iconStyle}>{icon}</span>
        <span className="font-bold">{title}</span>
      </div>
      <span className="font-bold">{value} {units}</span>
    </div>
  );
};

export default DataBox;

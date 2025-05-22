import React from 'react';

const Title = ({ title = '', subTitle = '', align = 'center', font = 'font-playfair' }) => {
  const alignmentClasses = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`flex flex-col ${alignmentClasses} justify-center`}>
      <h1 className={`text-5xl md:text-[40px] ${font} ${align === 'left' ? 'text-left' : 'text-center'}`}>
        {title}
      </h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;

import React from 'react';
import { faqs } from '../../data/resources';

const FAQ = () => {
  return (
    <div className="p-4 sm:p-0">
      <h1 className="text-2xl font-bold mb-4">FAQ</h1>
      <div className="join join-vertical w-full">
        {faqs.map((item, idx) => (
          <div key={idx} className="collapse collapse-arrow bg-base-200 join-item">
            <input type="checkbox" defaultChecked={idx === 0} />
            <div className="collapse-title text-secondary text-lg font-medium">{item.q}</div>
            <div className="collapse-content opacity-80">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

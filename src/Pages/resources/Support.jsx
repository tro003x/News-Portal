import React from 'react';
import { supportTopics } from '../../data/resources';

const Support = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <div className="space-y-4">
        {supportTopics.map((t) => (
          <div key={t.id} className="card bg-base-200">
            <div className="card-body">
              <h3 className="text-secondary card-title">{t.title}</h3>
              <p className="opacity-80">{t.summary}</p>
              <p className="opacity-70 mt-1">{t.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;

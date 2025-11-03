import React from 'react';
import { gettingStartedSteps } from '../../data/resources';

const GettingStarted = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Getting started</h1>
      <ol className="space-y-4 list-decimal list-inside">
        {gettingStartedSteps.map((step) => (
          <li key={step.id}>
            <div className="ml-1">
              <h3 className="text-secondary font-semibold">{step.title}</h3>
              <p className="opacity-80">{step.details}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GettingStarted;

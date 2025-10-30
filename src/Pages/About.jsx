import React, { useEffect, useState } from 'react';

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/about.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load about data');
        return res.json();
      })
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Error');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-6">Loading about...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  const title = data?.company || data?.title || 'About Us';
  const subtitle = data?.description || data?.subtitle || '';
  const overview = data?.overview || data?.descriptionBlocks || [];
  const mission = data?.mission || data?.companyMission || null;
  const vision = data?.vision || null;
  const team = Array.isArray(data?.team) ? data.team : data?.members || [];
  const careers = Array.isArray(data?.careers) ? data.careers : data?.jobs || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">{title}</h1>
      {subtitle && <p className="mb-4 text-gray-700">{subtitle}</p>}

      {overview && overview.length > 0 && (
        <div className="mb-4">
          {overview.map((p, idx) => (
            <p className="mb-2 text-gray-800" key={idx}>{p}</p>
          ))}
        </div>
      )}

      {mission && (
        <section className="mb-6">
          <h2 className="text-secondary text-xl font-semibold">Mission</h2>
          <p className="mt-2 text-gray-800">{mission}</p>
        </section>
      )}

      {vision && (
        <section className="mb-6">
          <h2 className="text-secondary text-xl font-semibold">Vision</h2>
          <p className="mt-2 text-gray-800">{vision}</p>
        </section>
      )}

      {team.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl  font-semibold">Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {team.map((member, i) => (
              <div key={i} className="p-4 border rounded shadow-sm bg-white">
                <div className="text-secondary font-semibold">{member.name}</div>
                {member.role && <div className="text-sm text-gray-500">{member.role}</div>}
                {member.bio && <p className="mt-2 text-gray-700 text-sm">{member.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {careers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Careers</h2>
          <ul className="mt-2 space-y-2">
            {careers.map((c, i) => (
              <li key={i} className="p-3 border rounded bg-white flex justify-between items-center">
                <div>
                  <div className="font-medium">{c.role || c.title}</div>
                  {c.type && <div className="text-sm text-gray-500">{c.type}</div>}
                </div>
                {c.apply ? (
                  <a className="btn btn-sm btn-primary" href={`mailto:${c.apply}`}>Apply</a>
                ) : (
                  <span className="text-sm text-gray-500">{c.location || ''}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default About;

// src/pages/Pengajuan/PengajuanPage.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FormPengajuan from './FormPengajuan';
import StatusPengajuan from './StatusPengajuan';

const PengajuanPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80; // Adjust for navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state]);

  return (
    <div className="space-y-6">
      <section className="mb-20">
        <FormPengajuan />
      </section>

      <section className="mb-20">
        <StatusPengajuan />
      </section>
    </div>
  );

};

export default PengajuanPage;
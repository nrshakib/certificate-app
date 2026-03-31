import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificateRenderer from '../components/CertificateRenderer';
import { generateRandomCertificateData } from '../lib/randomData';

const CertificatePage: React.FC = () => {
  const navigate = useNavigate();
  // Generate fresh random data on every visit to this route
  const data = useMemo(() => generateRandomCertificateData(), []);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const page1El = document.getElementById('cert-page-1');
    const page2El = document.getElementById('cert-page-2');
    const outerEl = document.getElementById('certificate-container')?.firstElementChild as HTMLElement | null;
    if (!page1El || !page2El || !outerEl) return;

    setIsGenerating(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      // Read the outer container's computed padding to reproduce it in the wrapped capture.
      // 210mm at 96dpi ≈ 794px; 20mm top/bottom ≈ 76px; 15mm left/right ≈ 57px.
      const A4_PX = 794;
      const PAD_V = 76;  // 20mm vertical padding
      const PAD_H = 57;  // 15mm horizontal padding

      const captureWithPadding = async (contentEl: HTMLElement): Promise<HTMLCanvasElement> => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = [
          `width:${A4_PX}px`,
          `background:#fff`,
          `padding:${PAD_V}px ${PAD_H}px`,
          `font-family:Arial,sans-serif`,
          `box-sizing:border-box`,
          `position:fixed`,
          `top:0`,
          `left:-9999px`,
        ].join(';');
        wrapper.appendChild(contentEl.cloneNode(true));
        document.body.appendChild(wrapper);
        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: A4_PX,
          windowWidth: A4_PX,
        });
        document.body.removeChild(wrapper);
        return canvas;
      };

      const [canvas1, canvas2] = await Promise.all([
        captureWithPadding(page1El),
        captureWithPadding(page2El),
      ]);

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      pdf.addImage(canvas1.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 210, 297);
      pdf.addPage();
      pdf.addImage(canvas2.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 210, 297);
      pdf.save(`Certificate_${data.trainee.firstName}_${data.trainee.lastName}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#e5e7eb', minHeight: '100vh', padding: '24px 0' }}>
      {/* Top bar */}
      <div
        style={{
          width: '210mm',
          margin: '0 auto 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px 18px',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#374151',
          }}
        >
          ← Zurück
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            style={{
              backgroundColor: isGenerating ? '#6ee7b7' : '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 18px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {isGenerating ? 'Generating…' : 'Download PDF'}
          </button>
          <button
            onClick={() => {
              // Navigate to the same route but force remount by using a key trick via navigate
              navigate('/certificate', { replace: true, state: { ts: Date.now() } });
              window.location.reload();
            }}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 18px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Neu generieren
          </button>
        </div>
      </div>

      <div id="certificate-container">
        <CertificateRenderer data={data} />
      </div>
    </div>
  );
};

export default CertificatePage;

import React, { useState } from 'react';
import { Download, Image, FileText, Code } from 'lucide-react';

interface ExportToolbarProps {
  onExportPNG: () => void;
  onExportPDF: () => void;
  onExportJSON: () => void;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({
  onExportPNG,
  onExportPDF,
  onExportJSON
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      top: 'var(--spacing-lg)',
      right: 'var(--spacing-lg)',
      zIndex: 50
    }}>
      {isOpen ? (
        <div style={{
          background: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--spacing-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-xs)'
        }}>
          <button
            onClick={() => {
              onExportPNG();
              setIsOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-md)',
              background: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              transition: 'background-color var(--transition-fast)',
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Image size={18} />
            <span>Export as PNG</span>
          </button>
          <button
            onClick={() => {
              onExportPDF();
              setIsOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-md)',
              background: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              transition: 'background-color var(--transition-fast)',
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <FileText size={18} />
            <span>Export as PDF</span>
          </button>
          <button
            onClick={() => {
              onExportJSON();
              setIsOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-md)',
              background: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              transition: 'background-color var(--transition-fast)',
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Code size={18} />
            <span>Export as JSON</span>
          </button>
          <div style={{
            height: '1px',
            background: 'var(--color-border)',
            margin: 'var(--spacing-xs) 0'
          }} />
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: 'var(--spacing-md)',
              background: 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              transition: 'background-color var(--transition-fast)',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            boxShadow: 'var(--shadow-md)',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
        >
          <Download size={18} />
          <span>Export</span>
        </button>
      )}
    </div>
  );
};

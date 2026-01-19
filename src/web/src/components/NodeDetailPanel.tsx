import React from 'react';
import { NodeData } from '../types/flow';
import { X, User, Cpu, AlertCircle, Lightbulb, ExternalLink } from 'lucide-react';

interface NodeDetailPanelProps {
  node: NodeData | null;
  onClose: () => void;
}

const uxTypeIcons = {
  consideration: Lightbulb,
  'best-practice': '✓',
  'common-mistake': AlertCircle,
  'security-tip': '🔒'
};

const uxTypeColors = {
  consideration: 'var(--color-warning)',
  'best-practice': 'var(--color-success)',
  'common-mistake': 'var(--color-error)',
  'security-tip': 'var(--color-security)'
};

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '400px',
      height: '100%',
      background: 'white',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'auto',
      zIndex: 100
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        background: 'white',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--spacing-lg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)' }}>{node.label}</h3>
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: 'var(--spacing-lg)' }}>
        {/* Description */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h4 style={{
            fontSize: 'var(--font-size-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            Description
          </h4>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{node.description}</p>
        </section>

        {/* User Action */}
        {node.userAction && (
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 style={{
              fontSize: 'var(--font-size-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <User size={16} />
              User Action
            </h4>
            <div style={{
              background: 'var(--color-bg-secondary)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-lg)',
              borderLeft: '3px solid var(--color-primary)'
            }}>
              {node.userAction}
            </div>
          </section>
        )}

        {/* System Response */}
        {node.systemResponse && (
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 style={{
              fontSize: 'var(--font-size-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <Cpu size={16} />
              System Response
            </h4>
            <div style={{
              background: 'var(--color-bg-secondary)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-lg)',
              borderLeft: '3px solid var(--color-success)'
            }}>
              {node.systemResponse}
            </div>
          </section>
        )}

        {/* Common Errors */}
        {node.commonErrors && node.commonErrors.length > 0 && (
          <section style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h4 style={{
              fontSize: 'var(--font-size-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <AlertCircle size={16} />
              Common Errors
            </h4>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none'
            }}>
              {node.commonErrors.map((error, idx) => (
                <li key={idx} style={{
                  background: 'var(--color-error-light)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--spacing-sm)',
                  display: 'flex',
                  gap: 'var(--spacing-sm)'
                }}>
                  <span style={{ color: 'var(--color-error)' }}>•</span>
                  <span style={{ flex: 1 }}>{error}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* UX Notes */}
        {node.uxNotes && node.uxNotes.length > 0 && (
          <section>
            <h4 style={{
              fontSize: 'var(--font-size-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <Lightbulb size={16} />
              UX Notes & Design Patterns
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)'
            }}>
              {node.uxNotes.map((note, idx) => {
                const iconValue = uxTypeIcons[note.type];
                const isComponent = typeof iconValue !== 'string';

                return (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--spacing-md)',
                      borderLeft: `4px solid ${uxTypeColors[note.type]}`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      {isComponent ? (
                        React.createElement(iconValue as React.ComponentType<{ size: number }>, { size: 16 })
                      ) : (
                        <span>{iconValue}</span>
                      )}
                      <span style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 600,
                        color: uxTypeColors[note.type]
                      }}>
                        {note.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                    </div>
                    <h5 style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-sm)'
                    }}>
                      {note.title}
                    </h5>
                    <p style={{
                      margin: 0,
                      fontSize: 'var(--font-size-sm)',
                      lineHeight: 1.6,
                      color: 'var(--color-text-secondary)'
                    }}>
                      {note.description}
                    </p>
                    {note.references && note.references.length > 0 && (
                      <div style={{ marginTop: 'var(--spacing-sm)' }}>
                        {note.references.map((ref, refIdx) => (
                          <a
                            key={refIdx}
                            href={ref}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: 'var(--font-size-xs)',
                              color: 'var(--color-primary)',
                              textDecoration: 'none'
                            }}
                          >
                            Reference <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

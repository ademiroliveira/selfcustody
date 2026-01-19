import { useState } from 'react';
import { FlowVisualizer } from './components/FlowVisualizer';
import { flows } from './flows';
import './styles/globals.css';
import './styles/flow.css';

function App() {
  const [selectedFlowIndex, setSelectedFlowIndex] = useState(0);
  const [showSelector, setShowSelector] = useState(false);

  const currentFlow = flows[selectedFlowIndex];

  return (
    <div className="App">
      {/* Flow Selector */}
      <div style={{
        position: 'fixed',
        bottom: 'var(--spacing-lg)',
        left: 'var(--spacing-lg)',
        zIndex: 100
      }}>
        {showSelector ? (
          <div style={{
            background: 'white',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'var(--spacing-sm)',
            minWidth: '250px'
          }}>
            <div style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: 'var(--spacing-xs)'
            }}>
              Select Flow
            </div>
            {flows.map((flow, index) => (
              <button
                key={flow.metadata.id}
                onClick={() => {
                  setSelectedFlowIndex(index);
                  setShowSelector(false);
                }}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  background: index === selectedFlowIndex ? 'var(--color-bg-secondary)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color var(--transition-fast)',
                  fontSize: 'var(--font-size-sm)'
                }}
                onMouseEnter={(e) => {
                  if (index !== selectedFlowIndex) {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== selectedFlowIndex) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                  {flow.metadata.title}
                </div>
                <div style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)'
                }}>
                  {flow.metadata.description}
                </div>
              </button>
            ))}
            <div style={{
              borderTop: '1px solid var(--color-border)',
              marginTop: 'var(--spacing-xs)',
              paddingTop: 'var(--spacing-xs)'
            }}>
              <button
                onClick={() => setShowSelector(false)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'background-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowSelector(true)}
            style={{
              background: 'white',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--spacing-md) var(--spacing-lg)',
              boxShadow: 'var(--shadow-md)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              transition: 'all var(--transition-fast)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
          >
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-xs)' }}>
              Current Flow
            </div>
            <div>{currentFlow.metadata.title}</div>
          </button>
        )}
      </div>

      <FlowVisualizer key={currentFlow.metadata.id} flow={currentFlow} />
    </div>
  );
}

export default App;

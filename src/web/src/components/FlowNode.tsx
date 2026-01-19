import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from '../types/flow';
import {
  PlayCircle,
  Circle,
  Shield,
  GitBranch,
  AlertCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface FlowNodeProps {
  data: NodeData;
  selected: boolean;
}

const nodeIcons = {
  start: PlayCircle,
  action: Circle,
  'security-checkpoint': Shield,
  decision: GitBranch,
  error: AlertCircle,
  success: CheckCircle,
  'ux-friction': AlertTriangle
};

const nodeColors = {
  start: 'var(--color-success)',
  action: 'var(--color-primary)',
  'security-checkpoint': 'var(--color-security)',
  decision: 'var(--color-warning)',
  error: 'var(--color-error)',
  success: 'var(--color-success)',
  'ux-friction': 'var(--color-friction)'
};

export const FlowNode: React.FC<FlowNodeProps> = ({ data, selected }) => {
  const Icon = nodeIcons[data.type];
  const iconColor = nodeColors[data.type];

  return (
    <div className={`flow-node node-${data.type}`} style={{
      padding: '12px 16px',
      borderRadius: '8px',
      minWidth: '180px',
      maxWidth: '280px',
      position: 'relative'
    }}>
      <Handle type="target" position={Position.Top} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <Icon size={18} color={iconColor} />
        <div style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: 0.7
        }}>
          {data.type.replace(/-/g, ' ')}
        </div>
      </div>

      <div style={{
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        marginBottom: '4px',
        lineHeight: 1.3
      }}>
        {data.label}
      </div>

      {data.estimatedTime && (
        <div style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
          marginTop: '4px'
        }}>
          ⏱ {data.estimatedTime}
        </div>
      )}

      {data.securityLevel && (
        <div style={{
          fontSize: 'var(--font-size-xs)',
          color: data.securityLevel === 'critical' ? 'var(--color-error)' : 'var(--color-warning)',
          fontWeight: 600,
          marginTop: '4px'
        }}>
          🔒 {data.securityLevel.toUpperCase()}
        </div>
      )}

      {selected && (
        <div style={{
          position: 'absolute',
          top: -2,
          right: -2,
          background: 'var(--color-primary)',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          ✓
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

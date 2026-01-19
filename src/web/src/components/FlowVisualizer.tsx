import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';

import { WalletFlow, NodeData, FilterState } from '../types/flow';
import { FlowNode } from './FlowNode';
import { NodeDetailPanel } from './NodeDetailPanel';
import { FilterPanel } from './FilterPanel';
import { ExportToolbar } from './ExportToolbar';
import { exportToPNG, exportToPDF, downloadFlowData } from '../utils/export';

interface FlowVisualizerProps {
  flow: WalletFlow;
}

const nodeTypes: NodeTypes = {
  custom: FlowNode as any
};

// Auto-layout using a simple hierarchical layout algorithm
const createLayoutedNodes = (flow: WalletFlow): Node[] => {
  const nodeMap = new Map(flow.nodes.map(n => [n.id, n]));
  const edgesBySource = new Map<string, string[]>();

  // Build adjacency list
  flow.edges.forEach(edge => {
    const targets = edgesBySource.get(edge.source) || [];
    targets.push(edge.target);
    edgesBySource.set(edge.source, targets);
  });

  // Calculate levels using BFS
  const levels = new Map<string, number>();
  const queue: Array<{ id: string; level: number }> = [];
  const visited = new Set<string>();

  // Find start nodes (nodes with no incoming edges)
  const hasIncoming = new Set(flow.edges.map(e => e.target));
  const startNodes = flow.nodes.filter(n => !hasIncoming.has(n.id));

  startNodes.forEach(node => {
    queue.push({ id: node.id, level: 0 });
    visited.add(node.id);
  });

  // BFS to assign levels
  while (queue.length > 0) {
    const { id, level } = queue.shift()!;
    levels.set(id, level);

    const targets = edgesBySource.get(id) || [];
    targets.forEach(targetId => {
      if (!visited.has(targetId)) {
        visited.add(targetId);
        queue.push({ id: targetId, level: level + 1 });
      }
    });
  }

  // Group nodes by level
  const nodesByLevel = new Map<number, string[]>();
  levels.forEach((level, nodeId) => {
    const nodesAtLevel = nodesByLevel.get(level) || [];
    nodesAtLevel.push(nodeId);
    nodesByLevel.set(level, nodesAtLevel);
  });

  // Position nodes
  const horizontalSpacing = 350;
  const verticalSpacing = 150;
  const nodes: Node[] = [];

  nodesByLevel.forEach((nodeIds, level) => {
    nodeIds.forEach((nodeId, index) => {
      const nodeData = nodeMap.get(nodeId);
      if (nodeData) {
        const yOffset = (nodeIds.length - 1) * verticalSpacing / 2;
        nodes.push({
          id: nodeId,
          type: 'custom',
          data: nodeData,
          position: {
            x: level * horizontalSpacing,
            y: index * verticalSpacing - yOffset
          }
        });
      }
    });
  });

  return nodes;
};

const createEdges = (flow: WalletFlow): Edge[] => {
  return flow.edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    type: edge.type === 'error' ? 'smoothstep' : 'default',
    animated: edge.type === 'alternative',
    style: {
      stroke: edge.type === 'error'
        ? 'var(--color-error)'
        : edge.type === 'alternative'
          ? 'var(--color-warning)'
          : 'var(--color-border-strong)',
      strokeWidth: 2
    },
    labelStyle: {
      fontSize: 12,
      fill: 'var(--color-text-secondary)'
    }
  }));
};

export const FlowVisualizer: React.FC<FlowVisualizerProps> = ({ flow }) => {
  const initialNodes = useMemo(() => createLayoutedNodes(flow), [flow]);
  const initialEdges = useMemo(() => createEdges(flow), [flow]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    walletTypes: [],
    experienceLevels: [],
    securityModels: [],
    categories: [],
    searchQuery: ''
  });

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as NodeData);
  }, []);

  const handleExportPNG = useCallback(async () => {
    try {
      await exportToPNG('flow-container', `${flow.metadata.id}.png`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PNG. Please try again.');
    }
  }, [flow.metadata.id]);

  const handleExportPDF = useCallback(async () => {
    try {
      await exportToPDF(
        'flow-container',
        `${flow.metadata.id}.pdf`,
        flow.metadata.title
      );
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    }
  }, [flow.metadata.id, flow.metadata.title]);

  const handleExportJSON = useCallback(() => {
    downloadFlowData(flow, `${flow.metadata.id}.json`);
  }, [flow]);

  // Filter nodes based on current filters
  const filteredNodeIds = useMemo(() => {
    // If no filters applied, show all
    if (filters.walletTypes.length === 0 &&
      filters.experienceLevels.length === 0 &&
      filters.securityModels.length === 0 &&
      filters.categories.length === 0 &&
      filters.searchQuery === '') {
      return new Set(flow.nodes.map(n => n.id));
    }

    // Apply search query
    let filtered = flow.nodes;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(node =>
        node.label.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query) ||
        node.userAction?.toLowerCase().includes(query) ||
        node.systemResponse?.toLowerCase().includes(query)
      );
    }

    return new Set(filtered.map(n => n.id));
  }, [filters, flow.nodes]);

  // Update node opacity based on filters
  const displayNodes = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      style: {
        ...node.style,
        opacity: filteredNodeIds.has(node.id) ? 1 : 0.3
      }
    }));
  }, [nodes, filteredNodeIds]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      <ExportToolbar
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onExportJSON={handleExportJSON}
      />

      {/* Flow Info Header */}
      <div style={{
        position: 'absolute',
        top: 'var(--spacing-lg)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        background: 'white',
        padding: 'var(--spacing-md) var(--spacing-xl)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 'var(--font-size-2xl)',
          marginBottom: 'var(--spacing-xs)'
        }}>
          {flow.metadata.title}
        </h1>
        <p style={{
          margin: 0,
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          {flow.metadata.description}
        </p>
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          justifyContent: 'center',
          marginTop: 'var(--spacing-sm)',
          flexWrap: 'wrap'
        }}>
          {flow.metadata.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 'var(--font-size-xs)',
                padding: '2px 8px',
                background: 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-secondary)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div id="flow-container" style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={displayNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.1}
          maxZoom={1.5}
          defaultEdgeOptions={{
            type: 'smoothstep'
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="var(--color-border)"
          />
          <Controls />
        </ReactFlow>
      </div>

      <NodeDetailPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: 'var(--spacing-lg)',
        right: 'var(--spacing-lg)',
        background: 'white',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)',
        fontSize: 'var(--font-size-xs)',
        zIndex: 10
      }}>
        <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
          Legend
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--color-success)',
              borderRadius: '2px'
            }} />
            <span>Start/Success</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--color-primary)',
              borderRadius: '2px'
            }} />
            <span>Action</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--color-security)',
              borderRadius: '2px'
            }} />
            <span>Security Checkpoint</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--color-error)',
              borderRadius: '2px'
            }} />
            <span>Error State</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--color-friction)',
              borderRadius: '2px'
            }} />
            <span>UX Friction Point</span>
          </div>
        </div>
      </div>
    </div>
  );
};

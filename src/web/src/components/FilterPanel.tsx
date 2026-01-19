import React from 'react';
import { FilterState, WalletType, ExperienceLevel, SecurityModel, FlowCategory } from '../types/flow';
import { Filter, X, Search } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const walletTypeOptions: { value: WalletType; label: string }[] = [
  { value: 'hot', label: 'Hot Wallet' },
  { value: 'cold', label: 'Cold Wallet' },
  { value: 'multi-sig', label: 'Multi-Sig' },
  { value: 'hardware', label: 'Hardware Wallet' }
];

const experienceLevelOptions: { value: ExperienceLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

const securityModelOptions: { value: SecurityModel; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'enhanced', label: 'Enhanced' },
  { value: 'maximum', label: 'Maximum' }
];

const categoryOptions: { value: FlowCategory; label: string }[] = [
  { value: 'wallet-creation', label: 'Wallet Creation' },
  { value: 'sending', label: 'Sending' },
  { value: 'receiving', label: 'Receiving' },
  { value: 'recovery', label: 'Recovery' },
  { value: 'multi-sig', label: 'Multi-Sig' },
  { value: 'hardware-wallet', label: 'Hardware Wallet' },
  { value: 'dapp-connection', label: 'DApp Connection' }
];

const FilterCheckbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <label style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm)',
    cursor: 'pointer',
    borderRadius: 'var(--radius-md)',
    transition: 'background-color var(--transition-fast)'
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        width: '16px',
        height: '16px',
        cursor: 'pointer'
      }}
    />
    <span style={{ fontSize: 'var(--font-size-sm)' }}>{label}</span>
  </label>
);

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  isOpen,
  onToggle
}) => {
  const toggleWalletType = (type: WalletType) => {
    const newTypes = filters.walletTypes.includes(type)
      ? filters.walletTypes.filter(t => t !== type)
      : [...filters.walletTypes, type];
    onFilterChange({ ...filters, walletTypes: newTypes });
  };

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    const newLevels = filters.experienceLevels.includes(level)
      ? filters.experienceLevels.filter(l => l !== level)
      : [...filters.experienceLevels, level];
    onFilterChange({ ...filters, experienceLevels: newLevels });
  };

  const toggleSecurityModel = (model: SecurityModel) => {
    const newModels = filters.securityModels.includes(model)
      ? filters.securityModels.filter(m => m !== model)
      : [...filters.securityModels, model];
    onFilterChange({ ...filters, securityModels: newModels });
  };

  const toggleCategory = (category: FlowCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const clearFilters = () => {
    onFilterChange({
      walletTypes: [],
      experienceLevels: [],
      securityModels: [],
      categories: [],
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.walletTypes.length > 0 ||
    filters.experienceLevels.length > 0 ||
    filters.securityModels.length > 0 ||
    filters.categories.length > 0 ||
    filters.searchQuery.length > 0;

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: 'var(--spacing-lg)',
          left: 'var(--spacing-lg)',
          background: 'white',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-fast)',
          zIndex: 50
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
      >
        <Filter size={18} />
        <span style={{ fontWeight: 600 }}>Filters</span>
        {hasActiveFilters && (
          <span style={{
            background: 'var(--color-primary)',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600
          }}>
            {filters.walletTypes.length + filters.experienceLevels.length +
              filters.securityModels.length + filters.categories.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '320px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <Filter size={20} />
          <h3 style={{ margin: 0 }}>Filters</h3>
        </div>
        <button
          onClick={onToggle}
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
        {/* Search */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <label style={{
            display: 'block',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-secondary)'
          }}>
            Search
          </label>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: 'var(--spacing-md)',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-tertiary)'
              }}
            />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              placeholder="Search flows..."
              style={{
                width: '100%',
                padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 40px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            />
          </div>
        </section>

        {/* Wallet Type */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h4 style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-secondary)'
          }}>
            Wallet Type
          </h4>
          {walletTypeOptions.map(option => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.walletTypes.includes(option.value)}
              onChange={() => toggleWalletType(option.value)}
            />
          ))}
        </section>

        {/* Experience Level */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h4 style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-secondary)'
          }}>
            Experience Level
          </h4>
          {experienceLevelOptions.map(option => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.experienceLevels.includes(option.value)}
              onChange={() => toggleExperienceLevel(option.value)}
            />
          ))}
        </section>

        {/* Security Model */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h4 style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-secondary)'
          }}>
            Security Model
          </h4>
          {securityModelOptions.map(option => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.securityModels.includes(option.value)}
              onChange={() => toggleSecurityModel(option.value)}
            />
          ))}
        </section>

        {/* Category */}
        <section style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h4 style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-secondary)'
          }}>
            Flow Category
          </h4>
          {categoryOptions.map(option => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.categories.includes(option.value)}
              onChange={() => toggleCategory(option.value)}
            />
          ))}
        </section>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'}
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};

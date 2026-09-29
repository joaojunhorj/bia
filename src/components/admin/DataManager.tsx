import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Testimonial, Stat, Feature, Module, Faq } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Search, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

type TableName = 'testimonials' | 'stats' | 'features' | 'modules' | 'faqs';

type FieldDef = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'select';
  options?: string[];
  required?: boolean;
  full?: boolean;
};

const tableMap: Record<TableName, { db: string; fields: FieldDef[]; columns: string[] }> = {
  testimonials: {
    db: 'site_testimonials',
    columns: ['id', 'name', 'role', 'text', 'image_url', 'stars', 'is_active', 'sort_order', 'created_at', 'updated_at'],
    fields: [
      { key: 'name', label: 'Nome', type: 'text', required: true },
      { key: 'role', label: 'Profissão', type: 'text', required: true },
      { key: 'text', label: 'Depoimento', type: 'textarea', required: true, full: true },
      { key: 'image_url', label: 'URL da foto', type: 'text', full: true },
      { key: 'stars', label: 'Estrelas (1-5)', type: 'number', required: true },
      { key: 'sort_order', label: 'Ordem', type: 'number' },
      { key: 'is_active', label: 'Ativo', type: 'checkbox' },
    ],
  },
  stats: {
    db: 'site_stats',
    columns: ['id', 'value', 'label', 'icon_name', 'is_active', 'sort_order', 'created_at', 'updated_at'],
    fields: [
      { key: 'value', label: 'Valor', type: 'text', required: true },
      { key: 'label', label: 'Rótulo', type: 'text', required: true },
      { key: 'icon_name', label: 'Ícone', type: 'text', required: true },
      { key: 'sort_order', label: 'Ordem', type: 'number' },
      { key: 'is_active', label: 'Ativo', type: 'checkbox' },
    ],
  },
  features: {
    db: 'site_features',
    columns: ['id', 'title', 'description', 'icon_name', 'is_active', 'sort_order', 'created_at', 'updated_at'],
    fields: [
      { key: 'title', label: 'Título', type: 'text', required: true },
      { key: 'description', label: 'Descrição', type: 'text', required: true },
      { key: 'icon_name', label: 'Ícone', type: 'text', required: true },
      { key: 'sort_order', label: 'Ordem', type: 'number' },
      { key: 'is_active', label: 'Ativo', type: 'checkbox' },
    ],
  },
  modules: {
    db: 'site_modules',
    columns: ['id', 'title', 'description', 'icon_name', 'is_active', 'sort_order', 'created_at', 'updated_at'],
    fields: [
      { key: 'title', label: 'Título', type: 'text', required: true },
      { key: 'description', label: 'Descrição', type: 'text', required: true },
      { key: 'icon_name', label: 'Ícone', type: 'text', required: true },
      { key: 'sort_order', label: 'Ordem', type: 'number' },
      { key: 'is_active', label: 'Ativo', type: 'checkbox' },
    ],
  },
  faqs: {
    db: 'site_faqs',
    columns: ['id', 'question', 'answer', 'is_active', 'sort_order', 'created_at', 'updated_at'],
    fields: [
      { key: 'question', label: 'Pergunta', type: 'text', required: true, full: true },
      { key: 'answer', label: 'Resposta', type: 'textarea', required: true, full: true },
      { key: 'sort_order', label: 'Ordem', type: 'number' },
      { key: 'is_active', label: 'Ativo', type: 'checkbox' },
    ],
  },
};

type RowData = Record<string, unknown>;

export default function DataManager({ table, onRefresh }: { table: TableName; onRefresh: () => void }) {
  const config = tableMap[table];
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<RowData | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from(config.db)
      .select(config.columns.join(','))
      .order('sort_order', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  }, [config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (formData: RowData) => {
    setSaving(true);
    setError(null);

    const cleanData: RowData = {};
    for (const field of config.fields) {
      if (field.type === 'checkbox') {
        cleanData[field.key] = Boolean(formData[field.key]);
      } else if (field.type === 'number') {
        cleanData[field.key] = formData[field.key] === '' || formData[field.key] === undefined ? 0 : Number(formData[field.key]);
      } else {
        cleanData[field.key] = formData[field.key] ?? '';
      }
    }

    const id = editing?.id;
    let opError = null;

    if (creating) {
      const { error } = await supabase.from(config.db).insert(cleanData);
      opError = error;
    } else if (id) {
      const { error } = await supabase.from(config.db).update({ ...cleanData, updated_at: new Date().toISOString() }).eq('id', id);
      opError = error;
    }

    if (opError) {
      setError(opError.message);
    } else {
      setEditing(null);
      setCreating(false);
      await fetchData();
      onRefresh();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;
    const { error } = await supabase.from(config.db).delete().eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      await fetchData();
      onRefresh();
    }
  };

  const handleToggleActive = async (row: RowData) => {
    const { error } = await supabase
      .from(config.db)
      .update({ is_active: !row.is_active, updated_at: new Date().toISOString() })
      .eq('id', row.id as string);
    if (error) {
      setError(error.message);
    } else {
      await fetchData();
    }
  };

  const handleReorder = async (row: RowData, direction: 'up' | 'down') => {
    const idx = rows.findIndex((r) => r.id === row.id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= rows.length) return;
    const swapRow = rows[swapIdx];

    await Promise.all([
      supabase.from(config.db).update({ sort_order: swapRow.sort_order }).eq('id', row.id as string),
      supabase.from(config.db).update({ sort_order: row.sort_order }).eq('id', swapRow.id as string),
    ]);
    await fetchData();
  };

  const filtered = rows.filter((row) => {
    if (!search) return true;
    return Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));
  });

  const getDisplayValue = (row: RowData, key: string): string => {
    const field = config.fields.find((f) => f.key === key);
    if (field?.type === 'checkbox') return row[key] ? 'Sim' : 'Não';
    return String(row[key] ?? '');
  };

  const listColumns = config.fields.slice(0, 3).map((f) => f.key);

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-error-50 border border-error-200 text-error-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-dark-200 text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
        </div>
        <button
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Novo item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-dark-400">Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-dark-400">
          Nenhum item encontrado. Clique em "Novo item" para adicionar.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dark-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-50 border-b border-dark-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase tracking-wider">Ordem</th>
                  {listColumns.map((col) => (
                    <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase tracking-wider">
                      {config.fields.find((f) => f.key === col)?.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dark-500 uppercase tracking-wider">Ativo</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dark-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {filtered.map((row, i) => (
                  <tr key={row.id as string} className="hover:bg-dark-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-dark-500 w-6">{i + 1}</span>
                        <button
                          onClick={() => handleReorder(row, 'up')}
                          disabled={i === 0}
                          className="p-1 rounded hover:bg-dark-100 disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5 text-dark-500" />
                        </button>
                        <button
                          onClick={() => handleReorder(row, 'down')}
                          disabled={i === filtered.length - 1}
                          className="p-1 rounded hover:bg-dark-100 disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5 text-dark-500" />
                        </button>
                      </div>
                    </td>
                    {listColumns.map((col) => (
                      <td key={col} className="px-4 py-3 text-sm text-dark-700 max-w-xs truncate">
                        {col === 'image_url' && row[col] ? (
                          <img src={row[col] as string} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          getDisplayValue(row, col)
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(row)}
                        className={`p-1.5 rounded-lg ${row.is_active ? 'text-success-600 bg-success-50' : 'text-dark-400 bg-dark-100'}`}
                      >
                        {row.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditing(row);
                            setCreating(false);
                          }}
                          className="p-2 rounded-lg hover:bg-secondary-50 text-secondary-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id as string)}
                          className="p-2 rounded-lg hover:bg-error-50 text-error-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(editing || creating) && (
        <EditModal
          fields={config.fields}
          initialData={editing ?? {}}
          isCreate={creating}
          saving={saving}
          onSave={handleSave}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

function EditModal({
  fields,
  initialData,
  isCreate,
  saving,
  onSave,
  onClose,
}: {
  fields: FieldDef[];
  initialData: RowData;
  isCreate: boolean;
  saving: boolean;
  onSave: (data: RowData) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<RowData>(() => {
    const data: RowData = {};
    for (const field of fields) {
      if (field.type === 'checkbox') {
        data[field.key] = initialData[field.key] ?? true;
      } else if (field.type === 'number') {
        data[field.key] = initialData[field.key] ?? 0;
      } else {
        data[field.key] = initialData[field.key] ?? '';
      }
    }
    return data;
  });

  const handleChange = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-dark-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h3 className="text-lg font-display font-bold text-dark-900">
            {isCreate ? 'Novo item' : 'Editar item'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-dark-100 transition-colors">
            <X className="w-5 h-5 text-dark-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-dark-700 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-error-500 ml-0.5">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] as string}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-dark-200 text-dark-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  />
                ) : field.type === 'checkbox' ? (
                  <button
                    type="button"
                    onClick={() => handleChange(field.key, !formData[field.key])}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      formData[field.key] ? 'bg-primary-500' : 'bg-dark-200'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                        formData[field.key] ? 'translate-x-7' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    value={String(formData[field.key] ?? '')}
                    onChange={(e) => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    required={field.required}
                    className="w-full px-4 py-2.5 rounded-xl border border-dark-200 text-dark-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-dark-200 text-dark-700 font-medium hover:bg-dark-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

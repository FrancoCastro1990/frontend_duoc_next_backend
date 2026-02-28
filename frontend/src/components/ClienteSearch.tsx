'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Cliente } from '@/types/solicitud.types';

interface ClienteSearchProps {
  value: string;
  onChange: (nombre: string, cliente?: Cliente) => void;
  error?: string;
}

export default function ClienteSearch({ value, onChange, error }: ClienteSearchProps) {
  const { t } = useTranslation();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtered, setFiltered] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleInput(text: string) {
    onChange(text);
    if (text.trim().length > 0) {
      const q = text.toLowerCase();
      setFiltered(clientes.filter((c) => c.nombre.toLowerCase().includes(q)));
      setOpen(true);
    } else {
      setFiltered([]);
      setOpen(false);
    }
  }

  function handleSelect(cliente: Cliente) {
    onChange(cliente.nombre, cliente);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => {
          if (value.trim().length > 0) setOpen(true);
        }}
        placeholder={t('search.placeholder')}
        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {open && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
          {filtered.map((c) => (
            <li
              key={c.dni}
              onClick={() => handleSelect(c)}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
            >
              <span className="font-medium">{c.nombre}</span>
              <span className="text-gray-500 ml-2">({c.dni})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

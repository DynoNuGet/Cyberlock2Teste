import React from 'react';

interface AvatarProps {
  nome: string;
  fotoUrl?: string | null;
  tamanho?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ nome, fotoUrl, tamanho = 32 }) => {
  const base: React.CSSProperties = {
    width: tamanho,
    height: tamanho,
    borderRadius: '50%',
    flexShrink: 0,
  };

  if (fotoUrl) {
    return <img src={fotoUrl} alt={nome} style={{ ...base, objectFit: 'cover' }} />;
  }

  return (
    <div
      aria-label={nome}
      style={{
        ...base,
        backgroundColor: '#7c3aed',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: tamanho * 0.45,
        textTransform: 'uppercase',
      }}
    >
      {nome.charAt(0)}
    </div>
  );
};

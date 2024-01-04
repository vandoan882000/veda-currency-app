import type { FC } from 'react';
import React from 'react'

interface ColorProps {
  hue: number;
  brightness: number;
  saturation: number;
  onClick: () => void;
}

export const Color: FC<ColorProps> = ({ hue, brightness, saturation, onClick}) => {
  const colorValue = `hsl(${hue}, ${saturation * 100}%, ${brightness * 100}%)`
  return (
    <div style={{ width: 35, height: 35, borderRadius: 10, backgroundColor: colorValue, border: '2px solid rgb(208, 208, 208)', cursor: 'pointer' }} onClick={onClick}></div>
  )
}

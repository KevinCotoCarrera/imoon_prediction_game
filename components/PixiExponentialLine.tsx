import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Container } from '@mui/material';

interface PixiLineProps {
  value: number;
}

const PixiExponentialLine: React.FC<PixiLineProps> = ({ value }) => {
  const numbers = Array.from({ length: 11 }, (_, i) => i); 
  const pixiContainer = useRef<HTMLDivElement | null>(null);
  const app = useRef<PIXI.Application | null>(null);
  const graphics = useRef<PIXI.Graphics | null>(null);
  const linePoints = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    app.current = new PIXI.Application({ width: 800, height: 600, backgroundColor: '#1E293B' });
    if (pixiContainer.current) {
		(pixiContainer.current as HTMLDivElement).appendChild(app.current.view as HTMLCanvasElement);
    }

    graphics.current = new PIXI.Graphics();
    app.current.stage.addChild(graphics.current);

    return () => {
      app.current?.destroy(true, true);
    };
  }, []);

  useEffect(() => {
    if (graphics.current) {
      linePoints.current.push({ x: linePoints.current.length, y: Math.exp(value) });

      graphics.current.clear();
      graphics.current.lineStyle(2, 0xffd900, 1);
      graphics.current.moveTo(0, 600);

      linePoints.current.forEach(point => {
        graphics.current!.lineTo(point.x * 10, 600 - point.y);
      });
    }
  }, [value]);

  return (
  	<Container component='section' className='flex flex-col justify-between items-center py-8 h-5/6 border rounded-xl bg-slate-800 border-slate-500'>
		<span className='text-7xl font-bold'>{value}x</span>
		<div ref={pixiContainer} />
		<Container>
			<div className='w-full h-[2px] bg-slate-600'></div>
			<Container className='flex justify-between mt-4'>
			{numbers.map((number) =>
			<div className='text-sm text-gray-500' key={number}>
				{number}
			</div>
			)}
			</Container>
		</Container>
		
	</Container>
  )
};

export default PixiExponentialLine;

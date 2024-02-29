'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';

import BIRDS from 'vanta/dist/vanta.birds.min';
import CELLS from 'vanta/dist/vanta.cells.min';
import DOTS from 'vanta/dist/vanta.dots.min';
import FOG from 'vanta/dist/vanta.fog.min';
import GLOBE from 'vanta/dist/vanta.globe.min';
import HALO from 'vanta/dist/vanta.halo.min';
import NET from 'vanta/dist/vanta.net.min';
import RINGS from 'vanta/dist/vanta.rings.min';
import TOPOLOGY from 'vanta/dist/vanta.topology.min';
import TRUNK from 'vanta/dist/vanta.trunk.min';
import WAVES from 'vanta/dist/vanta.waves.min';

import styles from './VantaHero.module.scss';

// Make sure window.THREE is defined, e.g. by including three.min.js in the document head using a <script> tag

type BirdsOptions = {
  birdSize?: number;
  wingSpan?: number;
  separation?: number;
  alignment?: number;
  cohesion?: number;
  quantity?: number;
  backgroundAlpha?: number;
  color1?: number;
  color2?: number;
  colorMode?: 'lerp' | 'easeInOut' | 'easeOut' | 'easeIn' | 'random';
};

type WavesOptions = {
  color?: number;
  shininess?: number;
  waveHeight?: number;
  waveSpeed?: number;
  zoom?: number;
};

type GlobeOptions = {
  backgroundColor?: number;
  color?: number;
  size?: number;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  xOffset?: number;
  yOffset?: number;
};

type NetOptions = {
  backgroundColor?: number;
  color?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
};

type TrunkOptions = {
  backgroundColor?: number;
  color?: number;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  chaos?: number;
  spin?: number;
};

type TopologyOptions = {
  backgroundColor?: number;
  color?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
  showDots?: boolean;
  dotColor?: number;
  lineColor?: number;
  backgroundAlpha?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  THREE?: any;
};

type DotsOptions = {
  color?: number;
  color2?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  size?: number;
  spacing?: number;
  chaos?: number;
  count?: number;
  maxDistance?: number;
  showLines?: boolean;
  lineColor?: number;
};

type HaloOptions = {
  color?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  size?: number;
  xOffset?: number;
  yOffset?: number;
  amplitudeFactor?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  THREE?: any;
};

type CellsOptions = {
  color1?: string;
  color2?: string;
  size?: number;
  speed?: number;
};

type FogOptions = {
  highlightColor?: string;
  midtoneColor?: string;
  lowlightColor?: string;
  baseColor?: string;
  blurFactor?: number;
  zoom?: number;
  speed?: number;
};

type RingsOptions = {
  backgroundColor?: number;
  color?: number;
  ringRadius?: number;
  ringDistance?: number;
  amplitudeFactor?: number;
  speed?: number;
  zoom?: number;
};

type AnimationDict = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  birds: (options: BirdsOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  waves: (options: WavesOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globe: (options: GlobeOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  net: (options: NetOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trunk: (options: TrunkOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topology: (options: TopologyOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dots: (options: DotsOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  halo: (options: HaloOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rings: (options: RingsOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cells: (options: CellsOptions) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fog: (options: FogOptions) => any;
};

interface VantaHeroProps {
  animation: keyof AnimationDict;
  options?:
    | BirdsOptions
    | WavesOptions
    | GlobeOptions
    | NetOptions
    | TrunkOptions
    | TopologyOptions
    | DotsOptions
    | HaloOptions
    | RingsOptions;
  opacity?: number;
  style?: React.CSSProperties;
  displayOnRightSide?: boolean;
}

export const VantaHero = ({
  animation,
  options,
  opacity = 1,
  style = undefined,
  displayOnRightSide = false,
}: VantaHeroProps) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    const animationDict = {
      birds: BIRDS,
      waves: WAVES,
      globe: GLOBE,
      net: NET,
      trunk: TRUNK, //Broken
      topology: TOPOLOGY, //Broken
      dots: DOTS,
      halo: HALO,
      rings: RINGS,
      cells: CELLS,
      fog: FOG,
    };
    let animationData = animationDict[animation];

    if (!animationData) {
      console.log('animation not found');
      animationData = TOPOLOGY;
    }

    console.log('state', { vantaEffect, animation, options });

    if (!vantaEffect) {
      setTimeout(() => {
        try {
          setVantaEffect(
            animationData({
              el: myRef.current,
              ...(options || {}),
            }),
          );
        } catch (e) {
          console.log('Vanta Error, fallback');
          console.error(e);
          setTimeout(() => {
            setVantaEffect(
              animationData({
                el: myRef.current,
                ...(options || {}),
              }),
            );
          }, 2200);
        }
      }, 500);
    }

    return () => {
      if (vantaEffect) {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          vantaEffect.destroy();
        } catch (e) {
          console.log('Vanta Error, destroy', e);
        }
      }
    };
  }, [vantaEffect, animation, options]);

  return (
    <div
      style={{ ...style, opacity }}
      className={`absolute right-0 top-0 z-0 h-screen max-lg:h-full ${
        displayOnRightSide ? 'w-3/5 overflow-hidden max-lg:w-full' : 'w-full'
      }`}
      ref={myRef}
    >
      <div className={styles.fadeOut} />
    </div>
  );
};

import type { NbStickerShape } from './sticker.types';

export interface NbStickerPathConfig {
  viewBox: string;
  path: string;
  shadowTransform: string;
}

export const NB_STICKER_PATHS: Record<NbStickerShape, NbStickerPathConfig> = {
  burst: {
    viewBox: '0 0 160 160',
    shadowTransform: 'translate(7 7)',
    path: `
      M80 12
      L96 35
      L125 23
      L121 52
      L149 62
      L128 80
      L148 103
      L117 104
      L119 139
      L92 122
      L76 151
      L62 121
      L31 137
      L36 105
      L10 101
      L32 79
      L14 58
      L45 50
      L42 22
      L68 38
      Z
    `,
  },
  'burst-wide': {
    viewBox: '0 0 220 160',
    shadowTransform: 'translate(8 8)',
    path: `
      M108 10
      L126 38
      L164 20
      L162 50
      L211 58
      L179 78
      L211 101
      L169 105
      L172 143
      L135 126
      L112 153
      L92 126
      L53 145
      L57 108
      L12 103
      L43 81
      L12 59
      L57 50
      L53 21
      L91 39
      Z
    `,
  },
  star: {
    viewBox: '90 150 858 780',
    shadowTransform: 'translate(34 38)',
    path: `
      M296 178
      L512 302
      L724 182
      L690 392
      L884 510
      L680 610
      L670 866
      L482 692
      L250 788
      L304 564
      L120 468
      L314 386
      Z
    `,
  },
  splat: {
    viewBox: '0 0 108 108',
    shadowTransform: 'translate(6 6)',
    path: 'M50 5 L61 25 L84 15 L77 39 L97 50 L77 61 L86 86 L61 75 L50 98 L39 76 L15 86 L23 62 L3 50 L24 39 L15 14 L39 25 Z',
  },
};

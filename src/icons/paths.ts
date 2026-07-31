import type { EdsIconName } from './names.js';
import raw from './icon-paths.json';

export const iconPaths = raw as Record<EdsIconName, string>;

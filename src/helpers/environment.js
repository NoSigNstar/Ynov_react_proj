/**
 * Get all types of optimize method and return a array formated for semantic ui dropdown
 */
export function getoptimizerTypeArray() {
  const modes = [];

  for (const type in process.env.optimizerType) {
    if (!process.env.optimizerType.hasOwnProperty(type)) {
      continue;
    }

    modes.push({
      key: process.env.optimizerType[type].name,
      text: process.env.optimizerType[type].name,
      value: process.env.optimizerType[type].name,
      icon: process.env.optimizerType[type].icon,
      data: process.env.optimizerType[type].description
    });
  }

  return modes;
}

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

export function sortByIndex(orderArray, collection) {
  if (orderArray.length + 1 !== collection.length) {
    return { error: 'Lenght of collections doesn\'t match' };
  }

  const response = [];
  for (let i = 0; i < orderArray.length; i++) {
    const item = { ...collection[i + 1], index: orderArray[i] + 1 };
    response[orderArray[i]] = item;
  }
  response[0] = { ...collection[0], index: 1 };
  return response;
}

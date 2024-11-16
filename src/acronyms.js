import data from './data.json';
import customData from './customdata.json';

// Merge the two arrays
const acronyms = [...data, ...customData];

export default acronyms;
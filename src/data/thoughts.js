const thoughts = [
  'Small public fixes build trust faster than large promises.',
  'A report logged today is a safer street tomorrow.',
  'Good cities respond quickly and keep residents informed.',
  'Clear status updates reduce frustration more than silence ever could.',
  'Civic attention is a form of daily infrastructure.',
  'What gets measured gets improved, and what gets reported gets fixed.',
  'A visible queue of complaints is better than invisible neglect.',
  'When citizens can track progress, accountability becomes practical.',
  'Resilience in a city begins with noticing what is broken.',
  'Fast feedback loops turn complaints into public improvement.',
];

export function getThoughtOfDay(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const day = Math.floor(diff / 86400000);
  return thoughts[day % thoughts.length];
}

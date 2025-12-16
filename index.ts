export { parseArgsStringToArgv };
export default function parseArgsStringToArgv(
  value: string,
  env?: string,
  file?: string
): string[] {
  const myArray: string[] = [];
  if (env) {
    myArray.push(env);
  }
  if (file) {
    myArray.push(file);
  }

  let current = "";
  let inQuote: string | null = null;
  let hasToken = false; // Track if we've started a token (for empty quotes)
  let i = 0;

  while (i < value.length) {
    const char = value[i];

    if (inQuote) {
      // Inside quotes - look for the closing quote
      if (char === inQuote) {
        // End of quoted section
        inQuote = null;
      } else {
        // Add character to current token (without the quotes)
        current += char;
      }
    } else {
      // Outside quotes
      if (char === '"' || char === "'") {
        // Start of quoted section - this means we have a token even if empty
        inQuote = char;
        hasToken = true;
      } else if (/\s/.test(char)) {
        // Whitespace - end current token if we have one
        if (hasToken) {
          myArray.push(current);
          current = "";
          hasToken = false;
        }
      } else {
        // Regular character - add to current token
        current += char;
        hasToken = true;
      }
    }
    i++;
  }

  // Don't forget the last token
  if (hasToken) {
    myArray.push(current);
  }

  return myArray;
}

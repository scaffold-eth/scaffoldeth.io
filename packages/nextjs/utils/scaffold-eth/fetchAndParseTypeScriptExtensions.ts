type CuratedExtensionResponse = {
  extensionFlagValue: string;
  repository: string;
  branch?: string;
  // fields usefull for scaffoldeth.io
  description: string;
  createEthVersion?: string; // if not present we default to latest
  name?: string; // human redable name, if not present we default to branch or extensionFlagValue on UI
}[];

export async function fetchAndParseTypeScriptExtensions(url: string): Promise<CuratedExtensionResponse> {
  const response = await fetch(url);
  const tsContent = await response.text();

  // Remove TypeScript imports and type annotations
  const cleanedContent = tsContent.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, "").replace(/export\s+/g, "");

  // Extract the array content
  const arrayMatch = cleanedContent.match(/const\s+\w+:\s*\w+\[\]\s*=\s*(\[[\s\S]*?\]);/);

  if (!arrayMatch) {
    throw new Error("Could not parse TypeScript extension file");
  }

  // Use Function constructor to safely evaluate the array
  const arrayString = arrayMatch[1];
  const parsedArray = new Function(`return ${arrayString}`)();

  return parsedArray;
}

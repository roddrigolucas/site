export function getSchemaNames(documents: Array<{ type: string; name: string }>): string[] {
  return documents.map((document) => document.name);
}

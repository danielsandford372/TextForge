export class TextTransform {
  static toCamelCase(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
  }

  static toSnakeCase(text: string): string {
    return text
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  static toPascalCase(text: string): string {
    const camelCase = this.toCamelCase(text);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  }

  static toKebabCase(text: string): string {
    return text
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static trim(text: string): string {
    return text.trim().replace(/\s+/g, ' ');
  }

  static reverse(text: string): string {
    return text.split('').reverse().join('');
  }

  static removeSpecialChars(text: string): string {
    return text.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  static normalizeUnicode(text: string): string {
    return text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  }
}

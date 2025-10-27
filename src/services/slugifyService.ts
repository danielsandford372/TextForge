import slugify from 'slugify';

export class SlugifyService {
  static slugify(
    text: string,
    options: {
      lowercase?: boolean;
      strict?: boolean;
      separator?: string;
    } = {}
  ): string {
    const defaultOptions = {
      lower: options.lowercase !== false,
      strict: options.strict || false,
      replacement: options.separator || '-',
      remove: /[*+~.()'"!:@]/g,
    };

    return slugify(text, defaultOptions);
  }
}

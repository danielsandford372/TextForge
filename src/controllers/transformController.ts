import { Request, Response } from 'express';
import { TextTransform } from '../utils/textTransform';
import { ApiResponse, TransformRequest } from '../types';

export class TransformController {
  static transform(req: Request, res: Response): void {
    const { text, operation }: TransformRequest = req.body;

    let result: string;

    switch (operation) {
      case 'camelCase':
        result = TextTransform.toCamelCase(text);
        break;
      case 'snakeCase':
        result = TextTransform.toSnakeCase(text);
        break;
      case 'pascalCase':
        result = TextTransform.toPascalCase(text);
        break;
      case 'kebabCase':
        result = TextTransform.toKebabCase(text);
        break;
      case 'trim':
        result = TextTransform.trim(text);
        break;
      case 'reverse':
        result = TextTransform.reverse(text);
        break;
      case 'removeSpecialChars':
        result = TextTransform.removeSpecialChars(text);
        break;
      case 'normalizeUnicode':
        result = TextTransform.normalizeUnicode(text);
        break;
      default:
        result = text;
    }

    const response: ApiResponse = {
      success: true,
      data: {
        original: text,
        operation,
        result,
      },
    };

    res.json(response);
  }
}

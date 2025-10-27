import { Request, Response } from 'express';
import { LanguageService } from '../services/languageService';
import { ApiResponse, LanguageDetectionRequest } from '../types';

export class LanguageController {
  static detectLanguage(req: Request, res: Response): void {
    const { text }: LanguageDetectionRequest = req.body;

    const result = LanguageService.detectLanguage(text);

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.json(response);
  }
}

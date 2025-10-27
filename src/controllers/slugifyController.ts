import { Request, Response } from 'express';
import { SlugifyService } from '../services/slugifyService';
import { ApiResponse, SlugifyRequest } from '../types';

export class SlugifyController {
  static slugify(req: Request, res: Response): void {
    const { text, options }: SlugifyRequest = req.body;

    const slug = SlugifyService.slugify(text, options || {});

    const response: ApiResponse = {
      success: true,
      data: {
        original: text,
        slug,
      },
    };

    res.json(response);
  }
}

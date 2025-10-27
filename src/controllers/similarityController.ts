import { Request, Response } from 'express';
import { SimilarityService } from '../services/similarityService';
import { ApiResponse, SimilarityRequest } from '../types';

export class SimilarityController {
  static calculateSimilarity(req: Request, res: Response): void {
    const { text1, text2 }: SimilarityRequest = req.body;

    const similarity = SimilarityService.calculateSimilarity(text1, text2);
    const levenshteinDistance = SimilarityService.levenshteinDistance(
      text1,
      text2
    );

    const response: ApiResponse = {
      success: true,
      data: {
        text1,
        text2,
        similarityScore: similarity,
        levenshteinDistance,
        interpretation:
          similarity >= 80
            ? 'Very similar'
            : similarity >= 60
            ? 'Similar'
            : similarity >= 40
            ? 'Somewhat similar'
            : 'Not similar',
      },
    };

    res.json(response);
  }
}

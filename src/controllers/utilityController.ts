import { Request, Response } from 'express';
import { TextAnalysis } from '../utils/textAnalysis';
import { ProfanityService } from '../services/profanityService';
import {
  ApiResponse,
  WordCountRequest,
  SentenceExtractionRequest,
  TextStatisticsRequest,
  ProfanityCheckRequest,
} from '../types';

export class UtilityController {
  static wordCount(req: Request, res: Response): void {
    const { text }: WordCountRequest = req.body;

    const count = TextAnalysis.countWords(text);

    const response: ApiResponse = {
      success: true,
      data: {
        text,
        wordCount: count,
      },
    };

    res.json(response);
  }

  static extractSentences(req: Request, res: Response): void {
    const { text, maxSentences }: SentenceExtractionRequest = req.body;

    const sentences = TextAnalysis.extractSentences(text, maxSentences);

    const response: ApiResponse = {
      success: true,
      data: {
        sentences,
        count: sentences.length,
      },
    };

    res.json(response);
  }

  static getStatistics(req: Request, res: Response): void {
    const { text }: TextStatisticsRequest = req.body;

    const statistics = TextAnalysis.getTextStatistics(text);

    const response: ApiResponse = {
      success: true,
      data: statistics,
    };

    res.json(response);
  }

  static wordFrequency(req: Request, res: Response): void {
    const { text } = req.body;

    const frequency = TextAnalysis.getWordFrequency(text);

    // Sort by frequency (descending)
    const sortedFrequency = Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [word, count]) => {
        acc[word] = count;
        return acc;
      }, {} as Record<string, number>);

    const response: ApiResponse = {
      success: true,
      data: {
        frequency: sortedFrequency,
        totalUniqueWords: Object.keys(frequency).length,
      },
    };

    res.json(response);
  }

  static checkProfanity(req: Request, res: Response): void {
    const { text }: ProfanityCheckRequest = req.body;

    const result = ProfanityService.checkProfanity(text);

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    res.json(response);
  }
}

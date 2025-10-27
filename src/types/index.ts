export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SlugifyRequest {
  text: string;
  options?: {
    lowercase?: boolean;
    strict?: boolean;
    separator?: string;
  };
}

export interface TransformRequest {
  text: string;
  operation: 'camelCase' | 'snakeCase' | 'pascalCase' | 'kebabCase' | 'trim' | 'reverse' | 'removeSpecialChars' | 'normalizeUnicode';
}

export interface LanguageDetectionRequest {
  text: string;
}

export interface SimilarityRequest {
  text1: string;
  text2: string;
}

export interface WordCountRequest {
  text: string;
}

export interface SentenceExtractionRequest {
  text: string;
  maxSentences?: number;
}

export interface TextStatisticsRequest {
  text: string;
}

export interface ProfanityCheckRequest {
  text: string;
}

export interface TextStatistics {
  characterCount: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordLength: number;
  averageSentenceLength: number;
  readabilityScore: number;
  uniqueWords: number;
}

export interface LanguageDetectionResult {
  language: string;
  confidence: number;
  iso639_1?: string;
  iso639_3?: string;
}

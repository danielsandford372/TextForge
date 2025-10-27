import { TextStatistics } from '../types';

export class TextAnalysis {
  static countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  static countSentences(text: string): number {
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    return sentences ? sentences.length : 0;
  }

  static countParagraphs(text: string): number {
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    return paragraphs.length;
  }

  static extractSentences(text: string, maxSentences?: number): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const cleaned = sentences.map(s => s.trim());

    if (maxSentences && maxSentences > 0) {
      return cleaned.slice(0, maxSentences);
    }

    return cleaned;
  }

  static calculateAverageWordLength(text: string): number {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return 0;

    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    return parseFloat((totalLength / words.length).toFixed(2));
  }

  static calculateAverageSentenceLength(text: string): number {
    const sentences = this.extractSentences(text);
    if (sentences.length === 0) return 0;

    const totalWords = sentences.reduce(
      (sum, sentence) => sum + this.countWords(sentence),
      0
    );
    return parseFloat((totalWords / sentences.length).toFixed(2));
  }

  static countUniqueWords(text: string): number {
    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(word => word.replace(/[^a-z0-9]/g, ''));

    return new Set(words).size;
  }

  static calculateReadabilityScore(text: string): number {
    // Simplified Flesch Reading Ease formula
    const words = this.countWords(text);
    const sentences = this.countSentences(text) || 1;
    const syllables = this.estimateSyllables(text);

    if (words === 0) return 0;

    const score =
      206.835 -
      1.015 * (words / sentences) -
      84.6 * (syllables / words);

    return parseFloat(Math.max(0, Math.min(100, score)).toFixed(2));
  }

  private static estimateSyllables(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    let syllables = 0;

    for (const word of words) {
      const cleaned = word.replace(/[^a-z]/g, '');
      if (cleaned.length === 0) continue;

      const vowels = cleaned.match(/[aeiouy]+/g);
      syllables += vowels ? vowels.length : 1;

      // Adjust for silent 'e'
      if (cleaned.endsWith('e')) {
        syllables--;
      }

      // Minimum of 1 syllable per word
      if (syllables === 0) syllables = 1;
    }

    return syllables;
  }

  static getTextStatistics(text: string): TextStatistics {
    return {
      characterCount: text.length,
      wordCount: this.countWords(text),
      sentenceCount: this.countSentences(text),
      paragraphCount: this.countParagraphs(text),
      averageWordLength: this.calculateAverageWordLength(text),
      averageSentenceLength: this.calculateAverageSentenceLength(text),
      readabilityScore: this.calculateReadabilityScore(text),
      uniqueWords: this.countUniqueWords(text),
    };
  }

  static getWordFrequency(text: string): Record<string, number> {
    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map(word => word.replace(/[^a-z0-9]/g, ''));

    const frequency: Record<string, number> = {};

    for (const word of words) {
      if (word.length > 0) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    }

    return frequency;
  }
}

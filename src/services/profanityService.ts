import Filter from 'bad-words';

export class ProfanityService {
  private static filter = new Filter();

  static checkProfanity(text: string): {
    containsProfanity: boolean;
    cleanText: string;
    detectedWords: string[];
  } {
    const containsProfanity = this.filter.isProfane(text);
    const cleanText = this.filter.clean(text);

    // Extract detected profane words
    const words = text.toLowerCase().split(/\s+/);
    const detectedWords = words.filter(word =>
      this.filter.isProfane(word)
    );

    return {
      containsProfanity,
      cleanText,
      detectedWords: [...new Set(detectedWords)],
    };
  }

  static cleanText(text: string): string {
    return this.filter.clean(text);
  }
}

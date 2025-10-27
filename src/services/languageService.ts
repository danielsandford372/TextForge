import { franc } from 'franc';
import { LanguageDetectionResult } from '../types';

// ISO 639-3 to ISO 639-1 and language name mapping
const languageMap: Record<string, { name: string; iso639_1: string }> = {
  eng: { name: 'English', iso639_1: 'en' },
  spa: { name: 'Spanish', iso639_1: 'es' },
  fra: { name: 'French', iso639_1: 'fr' },
  deu: { name: 'German', iso639_1: 'de' },
  ita: { name: 'Italian', iso639_1: 'it' },
  por: { name: 'Portuguese', iso639_1: 'pt' },
  rus: { name: 'Russian', iso639_1: 'ru' },
  jpn: { name: 'Japanese', iso639_1: 'ja' },
  kor: { name: 'Korean', iso639_1: 'ko' },
  cmn: { name: 'Chinese (Mandarin)', iso639_1: 'zh' },
  ara: { name: 'Arabic', iso639_1: 'ar' },
  hin: { name: 'Hindi', iso639_1: 'hi' },
  nld: { name: 'Dutch', iso639_1: 'nl' },
  pol: { name: 'Polish', iso639_1: 'pl' },
  swe: { name: 'Swedish', iso639_1: 'sv' },
  und: { name: 'Unknown', iso639_1: 'unknown' },
};

export class LanguageService {
  static detectLanguage(text: string): LanguageDetectionResult {
    const iso639_3 = franc(text, { minLength: 3 });

    const languageInfo = languageMap[iso639_3] || {
      name: 'Unknown',
      iso639_1: 'unknown',
    };

    // Calculate confidence based on text length and detection result
    let confidence = 0;
    if (iso639_3 !== 'und') {
      if (text.length < 10) {
        confidence = 30;
      } else if (text.length < 50) {
        confidence = 60;
      } else if (text.length < 100) {
        confidence = 80;
      } else {
        confidence = 95;
      }
    }

    return {
      language: languageInfo.name,
      confidence: confidence,
      iso639_1: languageInfo.iso639_1,
      iso639_3: iso639_3,
    };
  }
}

import { compareTwoStrings } from 'string-similarity';

export class SimilarityService {
  static calculateSimilarity(text1: string, text2: string): number {
    const similarity = compareTwoStrings(text1, text2);
    // Convert to percentage (0-100)
    return parseFloat((similarity * 100).toFixed(2));
  }

  static levenshteinDistance(text1: string, text2: string): number {
    const matrix: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= text2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= text1.length; j++) {
      matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= text2.length; i++) {
      for (let j = 1; j <= text1.length; j++) {
        if (text2.charAt(i - 1) === text1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    return matrix[text2.length][text1.length];
  }
}

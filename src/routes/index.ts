import { Router } from 'express';
import { SlugifyController } from '../controllers/slugifyController';
import { TransformController } from '../controllers/transformController';
import { LanguageController } from '../controllers/languageController';
import { SimilarityController } from '../controllers/similarityController';
import { UtilityController } from '../controllers/utilityController';
import {
  validateTextInput,
  validateSimilarityInput,
  validateTransformInput,
} from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'TextForge API is running',
    timestamp: new Date().toISOString(),
  });
});

// Slugification
router.post(
  '/slugify',
  validateTextInput('text'),
  asyncHandler(SlugifyController.slugify)
);

// Text transformation
router.post(
  '/transform',
  validateTransformInput,
  asyncHandler(TransformController.transform)
);

// Language detection
router.post(
  '/language/detect',
  validateTextInput('text'),
  asyncHandler(LanguageController.detectLanguage)
);

// String similarity
router.post(
  '/similarity',
  validateSimilarityInput,
  asyncHandler(SimilarityController.calculateSimilarity)
);

// Utilities
router.post(
  '/utility/word-count',
  validateTextInput('text'),
  asyncHandler(UtilityController.wordCount)
);

router.post(
  '/utility/sentences',
  validateTextInput('text'),
  asyncHandler(UtilityController.extractSentences)
);

router.post(
  '/utility/statistics',
  validateTextInput('text'),
  asyncHandler(UtilityController.getStatistics)
);

router.post(
  '/utility/word-frequency',
  validateTextInput('text'),
  asyncHandler(UtilityController.wordFrequency)
);

router.post(
  '/utility/profanity-check',
  validateTextInput('text'),
  asyncHandler(UtilityController.checkProfanity)
);

export default router;

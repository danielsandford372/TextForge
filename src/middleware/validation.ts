import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

export const validateTextInput = (fieldName: string = 'text') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const text = req.body[fieldName];

    if (!text) {
      throw new ApiError(`${fieldName} is required`, 400);
    }

    if (typeof text !== 'string') {
      throw new ApiError(`${fieldName} must be a string`, 400);
    }

    if (text.trim().length === 0) {
      throw new ApiError(`${fieldName} cannot be empty`, 400);
    }

    next();
  };
};

export const validateSimilarityInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text1, text2 } = req.body;

  if (!text1 || !text2) {
    throw new ApiError('Both text1 and text2 are required', 400);
  }

  if (typeof text1 !== 'string' || typeof text2 !== 'string') {
    throw new ApiError('Both text1 and text2 must be strings', 400);
  }

  if (text1.trim().length === 0 || text2.trim().length === 0) {
    throw new ApiError('text1 and text2 cannot be empty', 400);
  }

  next();
};

export const validateTransformInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, operation } = req.body;

  if (!text || !operation) {
    throw new ApiError('Both text and operation are required', 400);
  }

  const validOperations = [
    'camelCase',
    'snakeCase',
    'pascalCase',
    'kebabCase',
    'trim',
    'reverse',
    'removeSpecialChars',
    'normalizeUnicode',
  ];

  if (!validOperations.includes(operation)) {
    throw new ApiError(
      `Invalid operation. Must be one of: ${validOperations.join(', ')}`,
      400
    );
  }

  next();
};

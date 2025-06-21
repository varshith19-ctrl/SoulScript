import { pipeline } from '@xenova/transformers';

let classifier;

export async function initClassifier() {
  if (!classifier) {
    classifier = await pipeline(
      'text-classification',
      'Xenova/bert-base-multilingual-uncased-sentiment'
    );
  }
}

export async function analyzeTone(text) {
  await initClassifier();
  const result = await classifier(text);
  return result[0]?.label || 'UNKNOWN';
}


import { pipeline } from '@xenova/transformers';

let classifier;

export async function initClassifier() {
  if (!classifier) {
    classifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
  }
}

export async function analyzeTone(text) {
  await initClassifier();
  const result = await classifier(text);
  return result[0]?.label || 'UNKNOWN';
}

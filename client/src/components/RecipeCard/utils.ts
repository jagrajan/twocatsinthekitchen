import Fraction from 'fraction.js';
import { MeasuredIngredient } from 'store/recipeEditor/actions';

function createMeasurementText(
  minAmount: string,
  maxAmount: string,
  name: string,
  plural: string,
  scaleFactor: number
): string {
  let _max,
    _min,
    text = '';
  if (maxAmount !== '') {
    const min_amount = new Fraction(minAmount).mul(scaleFactor);
    const max_amount = new Fraction(maxAmount).mul(scaleFactor);
    _max = max_amount;
    _min = min_amount;
    if (min_amount.equals(max_amount)) {
      text = `${_max.toFraction(true)}`;
    } else {
      text = `${_min.toFraction(true)} to ${_max.toFraction(true)}`;
    }
    if (max_amount.divisible(1) && max_amount.equals(1)) {
      text += ` ${name}`;
    } else {
      text += ` ${plural}`;
    }
  }
  return text;
}

export const transformIngredient = (
  ingredient: MeasuredIngredient,
  scaleFactor = 1
): string => {
  const { minAmount, maxAmount } = ingredient;
  const { name, plural } = ingredient.unit;
  let text = createMeasurementText(minAmount, maxAmount, name || '', plural || '', scaleFactor);
  if (ingredient.alternativeMeasurement.length > 0) {
    text += ' (or ';
    text += ingredient.alternativeMeasurement.map(a => createMeasurementText(
      a.minAmount,
      a.maxAmount,
      a.unit.name || '',
      a.unit.plural || '',
      scaleFactor
    )).join(' or ');
    text += ') ';
  }
  if (name !== '') {
    if (text === '') {
      text = `${name} ${ingredient.ingredient.name}`;
    } else {
      text += ` ${ingredient.ingredient.plural}`;
    }
  } else {
    if (text === '') {
      text += `${ingredient.ingredient.plural}`;
    } else {
      text += ` ${text === '1 ' ? ingredient.ingredient.name : ingredient.ingredient.plural}`;
    }
  }
  if (text.startsWith('0 ')) {
    text = text.substring(2);
  }
  if (ingredient.instructions) {
    text += ` (${ingredient.instructions})`
  }
  return text;
};

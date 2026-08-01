import assert from "node:assert/strict";
import { test } from "node:test";
import { AssetLifecycleError, calculateAssetDisposal, calculateStraightLineDepreciation, normalizeReferenceMonth } from "../asset-lifecycle";

test("calculates straight-line depreciation and absorbs rounding in the final competence", () => {
  assert.equal(calculateStraightLineDepreciation({ acquisitionValue: 100, bookValue: 100, lifeSpanMonths: 3, periodNumber: 1 }), 33.33);
  assert.equal(calculateStraightLineDepreciation({ acquisitionValue: 100, bookValue: 33.34, lifeSpanMonths: 3, periodNumber: 3 }), 33.34);
});

test("never depreciates an asset before acquisition or after its useful life", () => {
  const input = { acquisitionValue: 120, bookValue: 120, lifeSpanMonths: 12 };
  assert.equal(calculateStraightLineDepreciation({ ...input, periodNumber: 0 }), 0);
  assert.equal(calculateStraightLineDepreciation({ ...input, periodNumber: 13 }), 0);
});

test("normalizes a competence to the first day of its UTC month", () => {
  assert.deepEqual(normalizeReferenceMonth(new Date("2026-08-27T00:00:00.000Z")), new Date("2026-08-01T12:00:00.000Z"));
  assert.throws(() => normalizeReferenceMonth(new Date("invalid")), AssetLifecycleError);
});

test("retains the book value and calculates the disposal gain or loss", () => {
  assert.deepEqual(calculateAssetDisposal(75.5, 100), { bookValue: 75.5, disposalValue: 100, gainLoss: 24.5 });
  assert.deepEqual(calculateAssetDisposal(75.5, 0), { bookValue: 75.5, disposalValue: 0, gainLoss: -75.5 });
});

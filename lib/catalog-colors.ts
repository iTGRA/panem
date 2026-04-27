// Цвета по DESIGN_SYSTEM.md §4.4 (категории) и CATALOG.md (бренды наследуют от направления).

export const CATEGORY_COLORS: Record<string, string> = {
  bakery: 'var(--c-amber)',
  confectionery: 'var(--c-rose)',
  chocolate: 'var(--c-amber)',
  dairy: 'var(--c-sky)',
  drinks: 'var(--c-blue)',
  gastronomy: 'var(--c-teal)',
  decoration: 'var(--c-coral)',
  packaging: 'var(--c-teal)',
  inventory: 'var(--c-violet)',
}

export const BRAND_COLORS: Record<string, string> = {
  'barry-callebaut': 'var(--c-amber)',
  backaldrin: 'var(--c-amber)',
  lesaffre: 'var(--c-amber)',
  'csm-ingredients': 'var(--c-rose)',
  lactalis: 'var(--c-sky)',
  unigra: 'var(--c-rose)',
  supermuka: 'var(--c-amber)',
  berta: 'var(--c-amber)',
  bakelab: 'var(--c-rose)',
  artko: 'var(--c-amber)',
  erkonproduct: 'var(--c-rose)',
  'osq-group': 'var(--c-teal)',
  invi: 'var(--c-violet)',
  fsd: 'var(--c-coral)',
}

export function getCategoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] ?? 'var(--c-ink)'
}

export function getBrandColor(slug: string): string {
  return BRAND_COLORS[slug] ?? 'var(--c-ink)'
}

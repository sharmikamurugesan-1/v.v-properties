export interface TestimonialItem {
  id: string;
  author: string;
  project: string;
  quote: string;
  verified: boolean;
}

// Empty by default: Never render unverified testimonials.
// Section will remain cleanly hidden when this array is empty.
export const TESTIMONIALS: TestimonialItem[] = [];

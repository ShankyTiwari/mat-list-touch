export const Constants = {
  MAX_OFFSET: 500,
  MIN_OFFSET: 0,
  DEFAULT_THRESHOLD: 100,
  DEFAULT_LIMIT: 300,
};

export enum Warnings {
  ADDING_DEFAULT_SLIDE_THRESHOLD = 'Will keep it default i.e.',
  SLIDE_THRESHOLD_NOT_FOUND = 'You have not provided the slideThreshold.',
  ZERO_SLIDE_THRESHOLD_NOT_ALLOWED = 'slideThreshold value can not be 0 or less than 0.',
  MAX_OFFSET_EXCEEDED = 'Swipe action threshold value should be less than 50.',
  LIMIT_TOO_LOW = 'Swipe limit should exceed threshold.',
  INVALID_SLIDE_THRESHOLD_NOT_ALLOWED = 'slideThreshold value is invalid, Expecting number between 0 to 50.',
}

import propertyGroups from 'stylelint-config-recess-order/groups';

export default {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'media-query-no-invalid': null,
    'order/properties-order': propertyGroups.map((group) => ({
      ...group,
      emptyLineBefore: 'always',
      noEmptyLineBetween: true,
    })),
    'color-hex-length': 'long',
    'declaration-block-no-redundant-longhand-properties': null,
    'font-family-name-quotes': 'always-unless-keyword',
    'declaration-empty-line-before': null,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'no-duplicate-selectors': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'declaration-no-important': true,
    'selector-class-pattern': [
      '^.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
      {
        resolveNestedSelectors: true,
        message: 'Expected class selector to match BEM CSS pattern.',
      },
    ],
    'declaration-property-value-no-unknown': true,
    'prettier/prettier': true,
  },
};

import tokens from '../../tokens/govie';

const secondary = {
  backgroundColor: tokens.color.white,
  textColor: tokens.color.green,
  fontSize: tokens.fontSize.md,
  paddingTop: tokens.spacing.md,
  paddingBottom: tokens.spacing.md,
  paddingLeft: tokens.spacing.lg,
  paddingRight: tokens.spacing.lg,
};

const ButtonTheme = {
  default: secondary,
  secondary,
  primary: {
    backgroundColor: tokens.color.gold,
    textColor: tokens.color.white,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.md,
  },
};

export default ButtonTheme;

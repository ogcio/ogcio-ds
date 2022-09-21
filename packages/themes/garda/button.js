import tokens from '@ogcio-ds/tokens/garda';

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
    backgroundColor: tokens.color.blue,
    textColor: tokens.color.white,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.md,
  },
};

export default ButtonTheme;

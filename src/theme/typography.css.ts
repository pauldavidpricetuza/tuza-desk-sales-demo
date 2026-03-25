import { styleVariants } from "@vanilla-extract/css";
import { messina, denim, spaceMono } from "./fonts.css";
import { recipe } from "@vanilla-extract/recipes";

export const weight = {
  regular: "400",
  medium: "500",
} as const;

const fontFamily = {
  serif: `${messina}, Georgia, serif`,
  sans: `${denim}, Arial, sans-serif`,
  monospace: `${spaceMono}, Courier, monospace`,
};

export const size = {
  base: "16px",

  heading1: "1.5rem", // 24px
  heading2: "1.25rem", // 20px
  heading3: "1rem", // 16px
  label1: "0.625rem", // 10px
  body1: "0.875rem", // 14px
  body2: "0.8125rem", // 13px
  code: "0.75rem", // 12px
  avatar: "0.5rem", // 8px
};

const lineHeight = {
  heading1: "2.125rem", // 34px
  heading2: "1.75rem", // 28px
  heading3: "1.5rem", // 24px
  label1: "0.875rem", // 14px
  body1: "1.25rem", // 20px
  body2: "1.25rem", // 20px
  code: "1.125rem", // 18px
  avatar: "1.25rem", // 20px
};

const letterSpacing = {
  heading1: "-0.02em",
  heading2: "-0.02em",
  heading3: "0.04em",
  label1: "0.08em",
  body1: "0.03em",
  body2: "0.03em",
  code: "0",
  avatar: "0.03em",
};

export const fonts = {
  heading1: {
    fontFamily: fontFamily.serif,
    fontWeight: weight.regular,
    fontSize: size.heading1,
    lineHeight: lineHeight.heading1,
    letterSpacing: letterSpacing.heading1,
    fontFeatureSettings: '"calt"',
    WebkitFontSmoothing: "antialiased",
  },
  heading2: {
    fontFamily: fontFamily.serif,
    fontWeight: weight.regular,
    fontSize: size.heading2,
    lineHeight: lineHeight.heading2,
    letterSpacing: letterSpacing.heading2,
    fontFeatureSettings: '"calt"',
    WebkitFontSmoothing: "antialiased",
  },
  heading3: {
    fontFamily: fontFamily.sans,
    fontWeight: weight.medium,
    fontSize: size.heading3,
    lineHeight: lineHeight.heading3,
    letterSpacing: letterSpacing.heading3,
    WebkitFontSmoothing: "antialiased",
  },
  label1: {
    fontFamily: fontFamily.monospace,
    fontWeight: weight.regular,
    fontSize: size.label1,
    lineHeight: lineHeight.label1,
    letterSpacing: letterSpacing.label1,
    textTransform: "uppercase",
    WebkitFontSmoothing: "antialiased",
  },
  body1: {
    fontFamily: fontFamily.sans,
    fontWeight: weight.regular,
    fontSize: size.body1,
    lineHeight: lineHeight.body1,
    letterSpacing: letterSpacing.body1,
    WebkitFontSmoothing: "antialiased",
  },
  body2: {
    fontFamily: fontFamily.sans,
    fontWeight: weight.regular,
    fontSize: size.body2,
    lineHeight: lineHeight.body2,
    letterSpacing: letterSpacing.body2,
    WebkitFontSmoothing: "antialiased",
  },
  code: {
    fontFamily: fontFamily.monospace,
    fontWeight: weight.regular,
    fontSize: size.code,
    lineHeight: lineHeight.code,
    letterSpacing: letterSpacing.code,
    WebkitFontSmoothing: "antialiased",
  },
};

export const avatarType = {
  fontFamily: fontFamily.sans,
  fontWeight: weight.medium,
  fontSize: size.avatar,
  lineHeight: lineHeight.avatar,
  letterSpacing: letterSpacing.avatar,
  WebkitFontSmoothing: "antialiased",
};

export const text = recipe({
  variants: {
    font: styleVariants(fonts),
    weight: {
      regular: {
        fontWeight: weight.regular,
      },
      medium: {
        fontWeight: weight.medium,
      },
    },
  },
});

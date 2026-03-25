import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";
import { workflowNodeWrapper } from "#ui/WorkflowNode/WorkflowNode.css.js";

const nodeTitleBase = style([
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "spacing-2",
    padding: "spacing-4",
    borderTopLeftRadius: "m",
    borderTopRightRadius: "m",
  }),
]);

export const nodeTitle = {
  default: style([
    nodeTitleBase,
    sprinkles({
      backgroundColor: "background1",
    }),
    {
      selectors: {
        [`${workflowNodeWrapper.default}:hover &`]: {
          backgroundColor: themeVars.backgroundColour.background3,
        },
      },
    },
  ]),
  active: style([
    nodeTitleBase,
    sprinkles({
      backgroundColor: "background0",
    }),
  ]),
};

import { sprinkles } from "#theme/sprinkles.css.js";
import { themeVars } from "#theme/theme.css.js";
import { style } from "@vanilla-extract/css";
import { workflowNodeWrapper } from "#ui/WorkflowNode/WorkflowNode.css.js";

const nodeBodyBase = style([
  sprinkles({
    paddingTop: "spacing-2",
    paddingBottom: "spacing-3",
    paddingLeft: "spacing-3",
    paddingRight: "spacing-3",
    borderBottomLeftRadius: "m",
    borderBottomRightRadius: "m",
  }),
]);

export const nodeBody = {
  default: style([
    nodeBodyBase,
    sprinkles({
      backgroundColor: "background2",
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
    nodeBodyBase,
    sprinkles({
      backgroundColor: "background0",
    }),
  ]),
};

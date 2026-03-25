import {
  StatusLabel,
  StatusLabelStatus,
  NodeTitle,
  NodeBody,
} from "./components";
import {
  workflowNodeWrapper,
  workflowNodeContainer,
  statusLabelWrapper,
  horizontalRule,
  borderGradientBottom,
  borderGradientTop,
  innerContent,
} from "./WorkflowNode.css";

export type WorkflowNodeProps = {
  title?: string;
  type?: string;
  description: string;
  status?: StatusLabelStatus;
  isSelected?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const CardContent = ({
  title,
  type,
  description,
  isSelected,
  icon,
}: {
  title: string;
  type?: string;
  description: string;
  isSelected: boolean;
  icon?: React.ReactNode;
}) => {
  const state = isSelected ? "active" : "default";

  return (
    <>
      <NodeTitle
        title={title}
        type={type}
        state={state}
        titleVariant={type ? "withType" : "default"}
        icon={icon}
      />
      <div className={horizontalRule} />
      <NodeBody description={description} state={state} />
    </>
  );
};

export const WorkflowNode = ({
  title = "Trigger",
  type,
  description,
  status = "active",
  isSelected = false,
  icon,
  onClick,
}: WorkflowNodeProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  const wrapperVariant = isSelected ? "selected" : "default";
  const containerVariant = isSelected ? "selected" : "default";

  return (
    <div
      className={workflowNodeWrapper[wrapperVariant]}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={statusLabelWrapper}>
        <StatusLabel status={status} />
      </div>

      {isSelected ? (
        <div className={workflowNodeContainer[containerVariant]}>
          <div className={borderGradientBottom} />
          <div className={borderGradientTop} />
          <div className={innerContent}>
            <CardContent
              title={title}
              type={type}
              description={description}
              isSelected={isSelected}
              icon={icon}
            />
          </div>
        </div>
      ) : (
        <div className={workflowNodeContainer[containerVariant]}>
          <CardContent
            title={title}
            type={type}
            description={description}
            isSelected={isSelected}
            icon={icon}
          />
        </div>
      )}
    </div>
  );
};

WorkflowNode.displayName = "WorkflowNode";

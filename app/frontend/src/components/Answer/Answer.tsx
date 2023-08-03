import { useMemo } from "react";
import { Stack, IconButton } from "@fluentui/react";
import DOMPurify from "dompurify";

import styles from "./Answer.module.css";

import { AnswerIcon } from "./AnswerIcon";

interface Props {
    answer: string;
    dataPoints: string[];
    isSelected?: boolean;
    onSupportingContentClicked: () => void;
    showFollowupQuestions?: boolean;
}

export const Answer = ({ answer, dataPoints, isSelected, onSupportingContentClicked }: Props) => {
    console.log(`Before sanitization: ${answer}`);
    const sanitizedAnswerHtml = DOMPurify.sanitize(answer);
    console.log(`After sanitization: ${sanitizedAnswerHtml}`);

    return (
        <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} verticalAlign="space-between">
            <Stack.Item>
                <Stack horizontal horizontalAlign="space-between">
                    <AnswerIcon />
                    <div>
                        <IconButton
                            style={{ color: "black" }}
                            iconProps={{ iconName: "ClipboardList" }}
                            title="Show supporting content"
                            ariaLabel="Show supporting content"
                            onClick={() => onSupportingContentClicked()}
                            disabled={!dataPoints.length}
                        />
                    </div>
                </Stack>
            </Stack.Item>

            <Stack.Item grow>
                <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
            </Stack.Item>
        </Stack>
    );
};

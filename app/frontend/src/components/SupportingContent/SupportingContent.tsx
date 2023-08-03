import { parseSupportingContentItem } from "./SupportingContentParser";

import styles from "./SupportingContent.module.css";

interface Props {
    supportingContent: string[];
}

export const SupportingContent = ({ supportingContent }: Props) => {
    return (
        <ul className={styles.supportingContentNavList}>
            {supportingContent.map((x, i) => (
                <li className={styles.supportingContentItem} key={i}>
                    <p dangerouslySetInnerHTML={{ __html: x.replace(/\n/g, "<br>") }} />
                </li>
            ))}
        </ul>
    );
};

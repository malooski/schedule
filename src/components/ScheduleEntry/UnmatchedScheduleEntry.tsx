import { format } from "date-fns";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { useTextGlitch } from "../../util/react/use-text-glitch";
import { DayOfWeekDiv, ScheduleEntryRootDiv } from "./common";
import { CONTENT_HORIZONTAL_PADDING, DAY_OF_WEEK_WIDTH } from "./constants";

const RootDiv = styled(ScheduleEntryRootDiv)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BodyDiv = styled.div`
    margin: 0.5em ${CONTENT_HORIZONTAL_PADDING};

    display: grid;
    grid-template:
        "dayOfWeek entryTitle" 1fr /
        ${DAY_OF_WEEK_WIDTH} 1fr;
`;

const EntryTitle = styled.div`
    grid-area: entryTitle;
    align-self: center;

    font-family: "Exo 2", monospace;
`;

export function UnmatchedScheduleEntry(props: ScheduleEntryProps) {
    const { date } = props;

    const text = useTextGlitch("NO ENTRY");

    return (
        <RootDiv>
            <BodyDiv>
                <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
                <EntryTitle>{text}</EntryTitle>
            </BodyDiv>
        </RootDiv>
    );
}

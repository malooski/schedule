import { format } from "date-fns";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { DAY_OF_WEEK_WIDTH, ScheduleEntryRootDiv } from "./constants";

const RootDiv = styled(ScheduleEntryRootDiv)`
    display: grid;
    grid-template:
        "dayOfWeek entryTitle" 1fr /
        ${DAY_OF_WEEK_WIDTH} 1fr;
`;

const DayOfWeekDiv = styled.div`
    grid-area: dayOfWeek;
    align-self: center;
`;

const EntryTitle = styled.div`
    grid-area: entryTitle;
    align-self: center;
`;

export function UnmatchedScheduleEntry(props: ScheduleEntryProps) {
    const { date } = props;

    return (
        <RootDiv>
            <DayOfWeekDiv>{format(date, "EEEE")}</DayOfWeekDiv>
            <EntryTitle>No entry</EntryTitle>
        </RootDiv>
    );
}

import { format } from "date-fns";
import styled from "styled-components";
import { ScheduleEntryProps } from ".";
import { DAY_OF_WEEK_WIDTH, ScheduleEntryRootDiv, SCHEDULE_ENTRY_HEIGHT } from "./constants";

const RootDiv = styled(ScheduleEntryRootDiv)`
    border-radius: 1000px;

    height: ${SCHEDULE_ENTRY_HEIGHT};

    font-size: 36px;

    background-color: #3b3846;
    border: 1px solid #95919e;

    color: #95919e;

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

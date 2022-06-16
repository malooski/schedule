import { addWeeks, eachDayOfInterval, format, startOfWeek, subDays } from "date-fns";
import styled from "styled-components";

import logoUrl from "./assets/Logo.png";
import { ScheduleEntry } from "./components/ScheduleEntry";

import { THEME } from "./constants";

const RootDiv = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        -45deg,
        #eda3ec,
        #c765c8,
        #855cd2,
        #613fb6,
        #c765c8,
        #eda3ec,
        #f2b5cf
    );
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`;

const InnerDiv = styled.div`
    border-radius: 1em;
    margin: 1em;

    width: 900px;

    flex-grow: 1;
    background-image: radial-gradient(#515257, #3b3846);
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 2em 0;
`;

const LogoImg = styled.img`
    width: 75%;
`;

const EntriesArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    gap: 8px;
`;

const WeekHeader = styled.div`
    font-family: "Star Fighters";

    font-size: 2em;
    font-weight: bold;
    color: ${THEME.colors.lightGrey};
`;

function App() {
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = subDays(addWeeks(weekStart, 1), 1);

    const days = eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
    });

    return (
        <RootDiv>
            <InnerDiv>
                <LogoImg src={logoUrl} />

                <WeekHeader>
                    Week Of {format(weekStart, "M/d")} - {format(weekEnd, "M/d")}
                </WeekHeader>

                <EntriesArea>
                    {days.map(day => (
                        <ScheduleEntry date={day} />
                    ))}
                </EntriesArea>
            </InnerDiv>
        </RootDiv>
    );
}

export default App;

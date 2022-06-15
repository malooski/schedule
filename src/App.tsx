import { addWeeks, eachDayOfInterval, format, startOfWeek, subDays } from "date-fns";
import styled from "styled-components";

import logoUrl from "./assets/Logo.png";
import { ScheduleEntry } from "./components/ScheduleEntry";

import malooUrl from "./assets/malooski comm C.png";
import { THEME } from "./constants";

const BorderDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 1920px;
    height: 1080px;
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
    align-items: stretch;
    align-content: stretch;

    overflow-y: auto;
`;

const InnerDiv = styled.div`
    border-radius: 16px;
    margin: 16px;

    align-self: stretch;
    flex-grow: 1;
    background-image: radial-gradient(#515257, #3b3846);
    background-size: cover;
`;

const LogoImg = styled.img`
    position: absolute;
    top: 36px;
    left: 16px;

    width: 900px;
`;

const EntriesArea = styled.div`
    position: absolute;
    left: 900px;
    top: 110px;

    width: 950px;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    gap: 8px;
`;

const WeekHeader = styled.div`
    font-family: "Star Fighters";

    font-size: 36px;
    font-weight: bold;
    color: ${THEME.colors.lightGrey};

    position: absolute;
    top: 32px;
    left: 950px;
`;

const MalooImg = styled.img`
    position: absolute;
    width: 900px;
    left: 0px;
    bottom: 32px;
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
        <BorderDiv>
            <InnerDiv>
                <MalooImg src={malooUrl} />

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
        </BorderDiv>
    );
}

export default App;

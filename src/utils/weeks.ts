export interface WeekDay {
  dateStr: string;
  dayName: string;
  formattedDate: string;
  isSaturday: boolean;
}

export interface AcademicWeek {
  weekId: string; // "2026-08-31" (the Monday date)
  weekNumber: number;
  startDate: string; // "2026-08-31"
  endDate: string; // "2026-09-05" (Saturday)
  monthLabel: string; // "September 2026"
  label: string; // "Week 23: 31 Aug – 05 Sep 2026"
  days: WeekDay[];
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getAcademicWeeks(): AcademicWeek[] {
  const weeks: AcademicWeek[] = [];

  // Start with the Monday of the week containing April 1, 2026
  // April 1, 2026 is Wednesday, so Monday is March 30, 2026
  const currentMonday = new Date(2026, 2, 30); // 2026-03-30
  // Academic year ends March 31, 2027
  const endLimit = new Date(2027, 3, 5); // April 5, 2027

  let weekNum = 1;

  while (currentMonday < endLimit) {
    const mondayStr = formatDateStr(currentMonday);
    const saturday = new Date(currentMonday);
    saturday.setDate(saturday.getDate() + 5);
    const saturdayStr = formatDateStr(saturday);

    const midWeek = new Date(currentMonday);
    midWeek.setDate(midWeek.getDate() + 2); // Wednesday gives primary month
    const monthLabel = `${monthNames[midWeek.getMonth()]} ${midWeek.getFullYear()}`;

    const days: WeekDay[] = [];
    for (let i = 0; i < 6; i++) {
      const dayDate = new Date(currentMonday);
      dayDate.setDate(dayDate.getDate() + i);
      const dStr = formatDateStr(dayDate);
      days.push({
        dateStr: dStr,
        dayName: dayNames[dayDate.getDay()],
        formattedDate: `${dayNames[dayDate.getDay()]}, ${dayDate.getDate()} ${monthNames[dayDate.getMonth()]} ${dayDate.getFullYear()}`,
        isSaturday: i === 5,
      });
    }

    const startShort = `${currentMonday.getDate()} ${monthNames[currentMonday.getMonth()].substring(0, 3)}`;
    const endShort = `${saturday.getDate()} ${monthNames[saturday.getMonth()].substring(0, 3)} ${saturday.getFullYear()}`;

    weeks.push({
      weekId: mondayStr,
      weekNumber: weekNum++,
      startDate: mondayStr,
      endDate: saturdayStr,
      monthLabel,
      label: `Week ${weekNum - 1}: ${startShort} – ${endShort}`,
      days,
    });

    currentMonday.setDate(currentMonday.getDate() + 7);
  }

  return weeks;
}

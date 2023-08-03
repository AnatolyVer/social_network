import dayjs from "dayjs";

import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const pluralize = (count: number, words: [string, string, string]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
};

export const convertDate = (inputDate: string) => {
    dayjs.locale('uk');
    const currentDate = dayjs();
    const targetDate = dayjs(inputDate);

    if (targetDate.isToday()) {
        const diffInHours = currentDate.diff(targetDate, 'hour');
        if (diffInHours >= 6) {
            return `сьогодні, о ${targetDate.format('HH:mm')}`;
        } else if (diffInHours >= 1) {
            return `${diffInHours} ${pluralize(diffInHours, ['годину', 'години', 'годин'])} тому`;
        } else {
            const diffInMinutes = currentDate.diff(targetDate, 'minute');
            if (diffInMinutes === 0) return "щойно"
            return `${diffInMinutes} ${pluralize(diffInMinutes, ['хвилину', 'хвилини', 'хвилин'])} тому`;
        }
    } else if (targetDate.isYesterday()) {
        return `вчора, о ${targetDate.format('HH:mm')}`;
    } else {
        let template = 'D'
        if (targetDate.date() > 9) template+='D'
        template+= ' MMM'
        if (!targetDate.isSame(dayjs(), 'year')) template+= ' YYYY'
        template+='; HH:mm'
        return targetDate.format(template);
    }
};
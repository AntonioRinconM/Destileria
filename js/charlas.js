const whatsappLink = 'https://wa.me/+5492235401044';
const eventDates = new Set([
    '2026-09-04',
    '2026-09-12',
    '2026-09-18',
    '2026-09-26',
    '2026-10-03',
    '2026-10-10',
    '2026-10-18',
    '2026-11-06',
    '2026-11-13',
    '2026-11-20',
    '2026-11-27',
    '2026-12-04',
    '2026-12-11',
    '2026-12-18',
    '2027-01-08',
    '2027-01-15',
    '2027-01-22',
    '2027-01-29',
    '2027-02-05',
    '2027-02-12',
    '2027-02-19',
]);

const monthLabel = document.getElementById('monthLabel');
const calendar = document.getElementById('calendar');
const monthControls = {
    prev: document.getElementById('prevMonth'),
    next: document.getElementById('nextMonth')
};

let currentMonth = new Date(2026, 8, 1);

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function renderCalendar() {
    if (!monthLabel || !calendar) return;

    monthLabel.textContent = new Intl.DateTimeFormat('es-ES', {
        month: 'long',
        year: 'numeric'
    }).format(currentMonth);

    calendar.innerHTML = '';

    const weekdayNames = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

    weekdayNames.forEach((name) => {
        const weekdayCell = document.createElement('div');
        weekdayCell.className = 'weekdayCell';
        weekdayCell.textContent = name;
        calendar.appendChild(weekdayCell);
    });

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 0; i < startOffset; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'dayCell isEmpty';
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dateKey = formatDateKey(date);
        const dayCell = document.createElement('div');
        dayCell.className = 'dayCell';

        if (eventDates.has(dateKey)) {
            const link = document.createElement('a');
            link.href = whatsappLink;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'dayLink hasEvent';
            link.textContent = day;
            link.setAttribute('aria-label', `Reservar charla el ${day}`);
            dayCell.appendChild(link);
        } else {
            const label = document.createElement('span');
            label.className = 'dayLink';
            label.textContent = day;
            dayCell.appendChild(label);
        }

        if (dateKey === formatDateKey(new Date())) {
            const link = dayCell.querySelector('a');
            if (link) {
                link.classList.add('today');
            }
        }

        calendar.appendChild(dayCell);
    }

    const remainingCells = (7 - ((startOffset + totalDays) % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'dayCell isEmpty';
        calendar.appendChild(emptyDay);
    }
}

monthControls.prev.addEventListener('click', () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    renderCalendar();
});

monthControls.next.addEventListener('click', () => {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    renderCalendar();
});

renderCalendar();

let isArabic = false;

function initializeCalendarLink() {
  const calendarLink = document.getElementById('calendar-link');
  if (isArabic) {
    const arabicCalendarFile = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:أحمد & نورهان زفاف
LOCATION:Moon Plaza, Army Works House, Maadi - Cairo
DTSTART:20250418T133000Z
DTEND:20250418T160000Z
DESCRIPTION:انضموا إلينا في يومنا المميز المليء بالحب والفرحة!
END:VEVENT
END:VCALENDAR`;
    calendarLink.href = arabicCalendarFile;
    calendarLink.download = 'wedding-invitation-ar.ics';
  } else {
    const englishCalendarFile = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Ahmed & Nourhan Wedding
LOCATION:Moon Plaza, Army Works House, Maadi - Cairo
DTSTART:20250418T133000Z
DTEND:20250418T160000Z
DESCRIPTION:Join us for our special day filled with love and joy!
END:VEVENT
END:VCALENDAR`;
    calendarLink.href = englishCalendarFile;
    calendarLink.download = 'wedding-invitation-en.ics';
  }
}

function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  const eventDate = new Date('2025-04-18T13:30:00Z').toLocaleString('en-US', { timeZone: 'Africa/Cairo' });
  const now = new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' });
  const distance = new Date(eventDate) - new Date(now);

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let countdownText;
    if (isArabic) {
      countdownText = `تبقى ${days} أيام ${hours} ساعات ${minutes} دقائق ${seconds} ثوان`;
    } else {
      countdownText = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`;
    }

    countdownElement.innerHTML = countdownText;
  } else {
    if (isArabic) {
      countdownElement.innerHTML = 'الحدث قد بدأ';
    } else {
      countdownElement.innerHTML = 'The event has started';
    }
  }
}

// Update the countdown on page load and every second
document.addEventListener('DOMContentLoaded', function() {
  initializeCalendarLink();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

function switchToArabic() {
  isArabic = true;
  updateContent();
}

function switchToEnglish() {
  isArabic = false;
  updateContent();
}

function updateContent() {
  const arabicImageURL = 'https://ik.imagekit.io/migzxyz/Copy%20of%20%D9%85%D9%84%D8%B5%D9%82%20%D8%B2%D9%81%D8%A7%D9%81%20%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%B5%D9%88%D8%B1%D8%A9%20%D8%A8%D8%B3%D9%8A%D8%B7%20%D8%A8%D9%86%D9%85%D8%B7%20%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%88%D9%84%D9%88%D9%86%20%D8%A7%D8%AE%D8%B6%D8%B1%20%D9%88%D8%A7%D8%A8%D9%8A%D8%B6_20250102_124417_0000.png?updatedAt=1740833504772';
  const englishImageURL = 'https://ik.imagekit.io/migzxyz/%D9%85%D9%84%D8%B5%D9%82%20%D8%B2%D9%81%D8%A7%D9%81%20%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%B5%D9%88%D8%B1%D8%A9%20%D8%A8%D8%B3%D9%8A%D8%B7%20%D8%A8%D9%86%D9%85%D8%B7%20%D8%AD%D8%AF%D9%8A%D8%AB%20%D9%88%D9%84%D9%88%D9%86%20%D8%A7%D8%AE%D8%B6%D8%B1%20%D9%88%D8%A7%D8%A8%D9%8A%D8%B6_20250102_124448_0000.png?updatedAt=1740833504844';

  const elements = {
    arabic: {
      img: arabicImageURL,
      title: 'يسعدنا دعوتكم لحفل زفاف',
      names: 'أحمد & نورهان',
      date: 'يوم الجمعة، 18 إبريل 2025 <br> من الساعة 3:30 مساءً إلى 6:00 مساءً',
      footer: 'شكراً لكم على مشاركتنا فرحتنا!',
      mapLink: 'عرض الموقع على الخريطة',
      calendarLink: 'إضافة إلى التقويم'
    },
    english: {
      img: englishImageURL,
      title: 'We are pleased to invite you to our wedding',
      names: 'Ahmed & Nourhan',
      date: 'Friday, April 18, 2025 <br> From 3:30 PM to 6:00 PM',
      footer: 'Thank you for joining us in our celebration!',
      mapLink: 'View Location on Map',
      calendarLink: 'Add to Calendar'
    }
  };

  const content = isArabic ? elements.arabic : elements.english;

  document.getElementById('invitation-image').src = content.img;
  document.getElementById('title').innerText = content.title;
  document.getElementById('names').innerText = content.names;
  document.getElementById('date').innerHTML = content.date;
  document.getElementById('footer-text').innerText = content.footer;
  document.getElementById('map-link').innerText = content.mapLink;
  document.getElementById('calendar-link').innerText = content.calendarLink;

  // Update calendar link
  initializeCalendarLink();

  // Update button text and onclick event
  const switchButton = document.querySelector('.language-switch button');
  switchButton.innerText = isArabic ? 'English' : 'العربية';
  switchButton.onclick = isArabic ? switchToEnglish : switchToArabic;
}

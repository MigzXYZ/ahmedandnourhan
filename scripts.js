const countdown = document.getElementById('countdown');
const eventDate = new Date('April 18, 2025 15:30:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    countdown.innerHTML = isArabic ? "حفل الزفاف قد بدأ!" : "The wedding has started!";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (isArabic) {
    countdown.innerHTML = `العد التنازلي: ${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
  } else {
    countdown.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

const interval = setInterval(updateCountdown, 1000);

let isArabic = false;

function switchToArabic() {
  isArabic = true;
  document.getElementById('title').innerText = 'يسعدنا دعوتكم لحفل زفاف';
  document.getElementById('names').innerText = 'أحمد & نورهان';
  document.getElementById('date').innerHTML = 'يوم الجمعة، 18 إبريل 2025 <br> من الساعة 3:30 مساءً إلى 6:00 مساءً';
  document.getElementById('map-link').innerText = 'الموقع على الخريطة';
  document.getElementById('calendar-link').innerText = 'إضافة إلى التقويم';
  document.getElementById('footer-text').innerText = 'شكراً لكم على مشاركتنا فرحتنا!';
  document.querySelector('.language-switch button').innerText = 'English';
  document.querySelector('.language-switch button').setAttribute('onclick', 'switchToEnglish()');
}

function switchToEnglish() {
  isArabic = false;
  document.getElementById('title').innerText = 'We are thrilled to invite you to our wedding';
  document.getElementById('names').innerText = 'Ahmed & Nourhan';
  document.getElementById('date').innerHTML = 'Friday, April 18, 2025 <br> From 3:30 PM to 6:00 PM';
  document.getElementById('map-link').innerText = 'View Location on Map';
  document.getElementById('calendar-link').innerText = 'Add to Calendar';
  document.getElementById('footer-text').innerText = 'Thank you for celebrating with us!';
  document.querySelector('.language-switch button').innerText = 'العربية';
  document.querySelector('.language-switch button').setAttribute('onclick', 'switchToArabic()');
}

updateCountdown();

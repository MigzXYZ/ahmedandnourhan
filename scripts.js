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

async function submitForm(event) {
  event.preventDefault();  // Prevents the default form submission behavior
  
  const name = document.getElementById('guest-name').value.trim();
  const message = document.getElementById('guest-message').value.trim();

  if (!name || !message) {
    alert(isArabic ? "يرجى ملء جميع الحقول!" : "Please fill out all fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      body: JSON.stringify({ name, message }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      alert(isArabic ? "شكراً لك على كلماتك الجميلة!" : "Thank you for your beautiful words!");
      document.getElementById('messageForm').reset(); // Clear the form
      document.getElementById('guest-name').disabled = true; // Disable name input
      document.getElementById('guest-message').disabled = true; // Disable message input
      document.querySelector('input[type="submit"]').disabled = true; // Disable submit button
    } else {
      const errorText = await response.text();
      alert(isArabic ? `عذراً! حدث خطأ ما: ${errorText}` : `Oops! Something went wrong: ${errorText}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(isArabic ? "خطأ في الشبكة. يرجى المحاولة لاحقاً." : "Network error. Please try again later.");
  }
}

function switchToArabic() {
  isArabic = true;
  document.getElementById('title').innerText = 'يسعدنا دعوتكم لحفل زفاف';
  document.getElementById('names').innerText = 'أحمد & نورهان';
  document.getElementById('date').innerHTML = 'يوم الجمعة، 18 إبريل 2025 <br> من الساعة 3:30 مساءً إلى 6:00 مساءً';
  document.getElementById('map-link').innerText = 'الموقع على الخريطة';
  document.getElementById('calendar-link').innerText = 'إضافة إلى التقويم';
  document.getElementById('form-title').innerText = 'اكتب رسالة تهنئة:';
  document.getElementById('name-label').innerText = 'الاسم:';
  document.getElementById('guest-name').placeholder = 'اكتب اسمك هنا';
  document.getElementById('message-label').innerText = 'رسالتك:';
  document.getElementById('guest-message').placeholder = 'اكتب رسالتك هنا...';
  document.querySelector('input[value="Submit"]').value = 'إرسال';
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
  document.getElementById('form-title').innerText = 'Please share your congratulatory message:';
  document.getElementById('name-label').innerText = 'Your Name:';
  document.getElementById('guest-name').placeholder = 'Your Name';
  document.getElementById('message-label').innerText = 'Your Message:';
  document.getElementById('guest-message').placeholder = 'Write your message here...';
  document.querySelector('input[value="Submit"]').value = 'Submit';
  document.getElementById('footer-text').innerText = 'Thank you for celebrating with us!';
  document.querySelector('.language-switch button').innerText = 'العربية';
  document.querySelector('.language-switch button').setAttribute('onclick', 'switchToArabic()');
}

updateCountdown();

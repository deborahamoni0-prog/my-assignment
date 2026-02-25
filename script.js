'use strict';

// Selected elements
const selectedDate = document.getElementById('date');
const calcBtn = document.getElementById('calculate');
const clearBtn = document.getElementById('clear');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const yearsEl = document.querySelector('.years-bold');
const monthsEl = document.querySelector('.months-bold');
const daysEl = document.querySelector('.days-bold');
const yearsP = document.querySelector('.years-p');
const monthsP = document.querySelector('.months-p');
const daysP = document.querySelector('.days-p');
const zodiacName = document.getElementById('sign');
const zodiacCharacteristics = document.getElementById('characteristics');
const zodiacDetails = document.getElementById('more-details');
const zodiacSummary = document.getElementById('summary');
const zodiacImage = document.getElementById('zodiacImage');

// Age formatter logic to determine if to display year or years, month or months, day or days
const ageFormatter = function (age, month, day) {
  if (age <= 1) {
    yearsP.innerText = 'Year';
  } else {
    yearsP.innerText = 'Years';
  }

  if (Math.abs(month) <= 1) {
    monthsP.innerText = 'Month';
  } else {
    monthsP.innerText = 'Months';
  }

  if (Math.abs(day) <= 1) {
    daysP.innerText = 'Day';
  } else {
    daysP.innerText = 'Days';
  }
};

const zodiacSign = function (month, day) {
  month = Math.abs(month);
  day = Math.abs(day);
  let currentMonth;

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Logic for converting the user month from integer to string
  months.forEach((mon, i) => {
    if (month === i) {
      currentMonth = months[i];
    }
    return currentMonth;
  });

  let date = new Date(`${currentMonth} ${day}`);

  // Condition statements for each zodiac sign to be displayed
  if (
    (date.getDate() >= 21 && currentMonth === 'Mar') ||
    (date.getDate() <= 19 && currentMonth === 'Apr')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Aries</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Eager, Dynamic , quick and competitive.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are assertive by nature and won't hesitate to tell people how you feel. But you do need to be mindful that you don't hurt anyone's feelings by speaking impulsively. You can be headstrong at times, and make a better leader than a follower.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> As the first sign to appear in the zodiac, Aries like yourself are typically brave and outgoing.
          </li>`;
    zodiacImage.src = `./img/aries.jpg`;
  } else if (
    (date.getDate() >= 20 && currentMonth === 'Apr') ||
    (date.getDate() <= 20 && currentMonth === 'May')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Taurus</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Strong, dependable, sensual and creative.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> This fixed earth sign like yourself has impeccable taste and loves to indulge. You tend to be financially responsible, but still know how to treat yourself and the ones you love. Though you do not have a stubborn streak, you are incredibly loyal and reliable.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> No one will expose you to the finer things in life quite like a Taurus. 
          </li>`;
    zodiacImage.src = `./img/taurus.jpg`;
  } else if (
    (date.getDate() >= 21 && currentMonth === 'May') ||
    (date.getDate() <= 20 && currentMonth === 'Jun')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Gemini</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Versatile, expressive, curious and kind.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You're witty and charming, but also have a darker side to you. You love to socialize but can become nervous or overstimulated when you dont't take time for yourself. You are also great at multitasking but needs to be careful not to take on too much at once.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Perhaps the most curious sign in the zodiac, Geminis like yourself make great students and communicators. 
          </li>`;
    zodiacImage.src = `./img/gemini.jpg`;
  } else if (
    (date.getDate() >= 21 && currentMonth === 'Jun') ||
    (date.getDate() <= 22 && currentMonth === 'Jul')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Cancer</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Intuitive, sentimental, compassionate and protective.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are intuitively nurturing and love to take care of the people around you. You have a reputation for being moody and aren't always the best at unpacking your feelings with others. You often opt to sort out your issues alone.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> As a water sign, Cancers like yourself feel deeply, though will often keep these sentiments hidden under your shell. 
          </li>`;
    zodiacImage.src = `./img/cancer.jpg`;
  } else if (
    (date.getDate() >= 23 && currentMonth === 'Jul') ||
    (date.getDate() <= 22 && currentMonth === 'Aug')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Leo</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Dramatic, outgoing, fiery and self-assured.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are confident and larger-than life, easily charming the people you encounter. However,you can be dramatic from time to time, especially if you feel disrespected. You feel passionately about your personal interests but need to be mindful that you show interest in the lives of those around you as well.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Warm, artistic, and protective of the ones you love. Leos like yourself make great friends and companions. 
          </li>`;
    zodiacImage.src = `./img/leo.jpg`;
  } else if (
    (date.getDate() >= 23 && currentMonth === 'Aug') ||
    (date.getDate() <= 22 && currentMonth === 'Sep')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Virgo</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Practical, loyal, gentle and analytical.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are very detailed-oriented, making you a master editor with extremely high standards. However, you need to be mindful that you are not overly demanding or critical of yourself or those around you.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> One of the most efficient members of the zodiac, Virgos like yourself, are organized, driven, and meticulous in their work. 
          </li>`;
    zodiacImage.src = `./img/virgo.jpg`;
  } else if (
    (date.getDate() >= 23 && currentMonth === 'Sep') ||
    (date.getDate() <= 22 && currentMonth === 'Oct')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Libra</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Social, fair-minded, diplomatic and gracious.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are extremely relationship-oriented but can sometimes prioritize your partner's needs over your own. This Venus ruled sign has a keen eye for aesthetics with impeccable personal style and well decorated homes.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Known for their diplomacy and harmonious energy, Libras like yourself, is one of the most laid-back members of the zodiac. 
          </li>`;
    zodiacImage.src = `./img/libra.jpg`;
  } else if (
    (date.getDate() >= 23 && currentMonth === 'Oct') ||
    (date.getDate() <= 21 && currentMonth === 'Nov')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Scorpio</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Passionate, stubborn, resourceful and brave.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are extremely intuitive and make natural psychologists with an ability to easily read those around you. You form intense bonds with your friends and romantic partners, but you can become possessive or jealous if you're not completely confident with yourself.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Mysterious, charismatic, brave, and magnetic. Scorpios like yourself are hard to ignore.
          </li>`;
    zodiacImage.src = `./img/scorpio.jpg`;
  } else if (
    (date.getDate() >= 22 && currentMonth === 'Nov') ||
    (date.getDate() <= 21 && currentMonth === 'Dec')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Sagittarius</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Extroverted, optimistic, funny and generous.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You lean toward optimism and love to take risks, but need to be mindful of living in the present and making practical plans for the future. Sagittarius like yourself are natural philosophers and are always looking to explore the mysteries of the universe.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Sagittarius is one of the most beloved members of the zodiac- with an adventurous, charismatic, and generous spirit.
          </li>`;
    zodiacImage.src = `./img/sagittarius.jpg`;
  } else if (
    (date.getDate() >= 22 && currentMonth === 'Dec') ||
    (date.getDate() <= 19 && currentMonth === 'Jan')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Capricorn</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Serious, independent, disciplined and tenacious.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are career-motivated and focused on status, these earth signs are highly driven to reach their professional goals and take their responsibilities very seriously. You're typically resistant to change and will often stick with your personal routines for many years.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Perhaps the most disciplined members of the zodiac, Capricorns like yourself are known for their endurance and determination.
          </li>`;
    zodiacImage.src = `./img/capricorn.jpg`;
  } else if (
    (date.getDate() >= 20 && currentMonth === 'Jan') ||
    (date.getDate() <= 18 && currentMonth === 'Feb')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Aquarius</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Deep, imaginative, original and uncompromising.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are driven by a desire to evolve past antiquated ideals, and help society to move into a more compassionate space. You can be seen as unpredictable or disorganized, but often surprise people with your streaks of brilliance and hidden genius.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Nothing says "quirky" quite like Aquarius energy does. This member of the zodiac like yourself embodies rebellion, creativity, eccentricity, and intelligence.
          </li>`;
    zodiacImage.src = `./img/aquarius.jpg`;
  } else if (
    (date.getDate() >= 19 && currentMonth === 'Feb') ||
    (date.getDate() <= 20 && currentMonth === 'Mar')
  ) {
    zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> Pisces</li>`;
    zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> Affectionate, empathetic, wise and artistic.
          </li>`;
    zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> You are extremely malleable and need to be careful of who you surround yourself with. Since you are hyper-intuitive, you can sometimes become disconnected-making it important for this water sign to ground often.
          </li>`;
    zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> Pisces signs like yourself have a peaceful and gentle presence about them, with an uncanny ability to tap into the emotions of the collective.
          </li>`;
    zodiacImage.src = `./img/pisces.jpg`;
  }
};

// Display History logic
const displayHistory = function (month, day, age) {
  const user = {
    userMonth: month,
    userDay: day,
    userAge: age,
  };

  const historyDetails = document.querySelector('.history-details');
  const history = JSON.parse(localStorage.getItem('ageHistory')) || [];

  history.push(user);

  localStorage.setItem('ageHistory', JSON.stringify(history));

  let historyHTML = '';

  history.forEach((user, index) => {
    historyHTML += `<p>${index + 1}. ${user.userAge} ${
      user.userAge > 1 ? 'years' : 'year'
    }, ${user.userMonth} ${user.userMonth > 1 ? 'months' : 'month'}, ${
      user.userDay
    } ${user.userDay > 1 ? 'days' : 'day'} old.</p>`;
  });

  historyDetails.innerHTML = historyHTML;
};

// Clear history logic
const clearHistory = function () {
  localStorage.removeItem('ageHistory');
  document.querySelector('.history-details').innerHTML = '';
};

// Calculate button logic
calcBtn.addEventListener('click', function () {
  const currentDate = new Date();
  const birthDate = new Date(selectedDate.value);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth() - birthDate.getMonth();
  const day = currentDate.getDate() - birthDate.getDate();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  yearsEl.innerText = age;
  monthsEl.innerText = Math.abs(month);
  daysEl.innerText = Math.abs(day);

  ageFormatter(age, month, day);

  zodiacSign(month, birthDate.getDate());

  displayHistory(Math.abs(month), Math.abs(day), age);

  return age, month, day;
});

// Clear button logic
clearBtn.addEventListener('click', function () {
  yearsEl.innerText = '';
  monthsEl.innerText = '';
  daysEl.innerText = '';
  selectedDate.value = '';
  zodiacName.innerHTML = `<li id="sign"><strong>Zodiac Sign:</strong> </li>`;
  zodiacCharacteristics.innerHTML = `<li id="characteristics">
            <strong>Characteristics:</strong> 
          </li>`;
  zodiacDetails.innerHTML = `<li id="more-details">
            <strong>More details:</strong> 
          </li>`;
  zodiacSummary.innerHTML = `<li id="summary">
            <strong>Summary:</strong> 
          </li>`;
  zodiacImage.src = ``;
});

// Clear history button logic
clearHistoryBtn.addEventListener('click', clearHistory);

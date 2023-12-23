async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  const cards = document.querySelector('.cards');
  const info = document.querySelector('.info');
  const res = await axios.get('http://localhost:3003/api/learners');
  const mentorsRes = await axios.get('http://localhost:3003/api/mentors');

  const learners = res.data;
  const mentors = mentorsRes.data;

  // getting names of mentors
  const newLearners = learners.map(learner => {
    learner.mentors = learner.mentors.map(mentor => {
      const mappedMentor = mentors.find(mentorObj => mentorObj.id === mentor);
      return `${mappedMentor.firstName} ${mappedMentor.lastName}`;
    })
    return learner;
  })

  const createLearnerCard = (learner) => {
    const cardElem = document.createElement('div');
    const cardNameHeaderElem = document.createElement('h3');
    const cardEmailElem = document.createElement('div');
    const cardMentorHeader = document.createElement('h4');
    const mentorList = document.createElement('ul');

    cardElem.classList.add('card');
    cardMentorHeader.classList.add('closed');

    cardElem.appendChild(cardNameHeaderElem);
    cardElem.appendChild(cardEmailElem);
    cardElem.appendChild(cardMentorHeader);
    cardElem.appendChild(mentorList);

    cardNameHeaderElem.textContent = learner.fullName;
    cardEmailElem.textContent = learner.email;
    cardMentorHeader.textContent = "Mentors";

    learner.mentors.forEach(mentorName => {
      const mentListItem = document.createElement('li');
      mentListItem.textContent = mentorName;
      mentorList.appendChild(mentListItem);
    })

    cardElem.addEventListener('click', (evt) => {
      const selectedCard = document.querySelector('.selected');
      if (selectedCard) {
        if (selectedCard !== evt.currentTarget) {
          selectedCard.classList.toggle('selected');
          evt.currentTarget.classList.add('selected');
          info.textContent = `The selected learner is ${learner.fullName}`
          if (evt.target.nodeName === 'H4') {
            evt.target.classList.toggle('closed');
            evt.target.classList.toggle('open');
          }
        } else {
          if (evt.target.nodeName === 'H4') {
            evt.target.classList.toggle('closed');
            evt.target.classList.toggle('open');
          } else {
            evt.currentTarget.classList.toggle('selected');
            info.textContent = "No learner is selected";
          }
        }
      } else {
        evt.currentTarget.classList.add('selected');
        info.textContent = `The selected learner is ${learner.fullName}`
        if (evt.target.nodeName === 'H4') {
          evt.target.classList.toggle('closed');
          evt.target.classList.toggle('open');
        }
      }
    })

    return cardElem;
  }

  newLearners.forEach(learner => {
    cards.appendChild(createLearnerCard(learner));
  })
  info.textContent = "No learner is selected";
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()

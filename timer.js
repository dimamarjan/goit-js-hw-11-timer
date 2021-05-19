const outputSections = {
  days: document.querySelector("span[data-value='days'"),
  hours: document.querySelector("span[data-value='hours'"),
  minutes: document.querySelector("span[data-value='mins'"),
  secons: document.querySelector("span[data-value='secs'"),
  timer: document.querySelector("#timer-1"),
  label: document.querySelectorAll("span.label"),
};

outputSections.timer.style = "display: flex";
outputSections.label.forEach((element) => (element.textContent = ":"));
outputSections.label[3].textContent = "";

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  timer() {
    let subTime;
    const timerOn = setInterval(() => {
      const timeNow = new Date().getTime();
      const timeSet = new Date(this.targetDate).getTime();
      subTime = timeSet - timeNow;

      const days = Math.floor(subTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (subTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((subTime % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((subTime % (1000 * 60)) / 1000);
      outputSections.days.textContent = days;
      outputSections.hours.textContent =
        hours.toString().length === 1 ? "0" + hours : hours;
      outputSections.minutes.textContent =
        mins.toString().length === 1 ? "0" + mins : mins;
      outputSections.secons.textContent =
        secs.toString().length === 1 ? "0" + secs : secs;
      if (subTime <= 0) {
        clearInterval(timerOn);
        const endMessage = document.createElement("div");
        endMessage.textContent = "DATE IS EXPIRED!!!";
        outputSections.timer.appendChild(endMessage);
        outputSections.days.textContent = "";
        outputSections.hours.textContent = "";
        outputSections.minutes.textContent = "";
        outputSections.secons.textContent = "";
        outputSections.label.forEach((element) => (element.textContent = ""));
      }
    }, 1000);
  }
}

const user = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 13, 2021 10:00"),
});

user.timer();

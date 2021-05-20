class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.outputSections = {
      days: document.querySelector(`${selector} span[data-value='days'`),
      hours: document.querySelector(`${selector} span[data-value='hours'`),
      minutes: document.querySelector(`${selector} span[data-value='mins'`),
      secons: document.querySelector(`${selector} span[data-value='secs'`),
      label: document.querySelectorAll(`${selector} span.label`),
    };
  }

  timer() {
    this.outputSections.label.forEach((element) => (element.textContent = ":"));
    this.outputSections.label[3].textContent = "";
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
      this.outputSections.days.textContent = days;
      this.outputSections.hours.textContent =
        hours.toString().length === 1 ? "0" + hours : hours;
      this.outputSections.minutes.textContent =
        mins.toString().length === 1 ? "0" + mins : mins;
      this.outputSections.secons.textContent =
        secs.toString().length === 1 ? "0" + secs : secs;
      if (subTime <= 0) {
        clearInterval(timerOn);
        const endMessage = document.createElement("div");
        endMessage.textContent = "DATE IS EXPIRED!!!";
        this.outputSections.timer.appendChild(endMessage);
        this.outputSections.days.textContent = "";
        this.outputSections.hours.textContent = "";
        this.outputSections.minutes.textContent = "";
        this.outputSections.secons.textContent = "";
        this.outputSections.label.forEach(
          (element) => (element.textContent = "")
        );
      }
    }, 1000);
  }
}

const user = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 15, 2021 10:00"),
});

user.timer();

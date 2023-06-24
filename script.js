class Countdown {
    constructor(config) {
        this.countdownEnd = config ? new Date(config.countdownEnd).getTime() : new Date().getTime() + (24 * 60 * 60 * 1000) ;
        this.countdownStart = config ? new Date(config.countdownStart).getTime() : new Date().getTime() ;
        this.countdownMS = this.countdownEnd - this.countdownStart;
        this.remainingSeconds = this.countdownMS / 1000;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.selector = config ? config.selector : 'div#countdown';
        this.theme = config ? config.theme : 'light';
        this.autoStart = config ? config.autoStart : false;
        this.element = null;
        this.countdownRunning = false;
        this.countdownInterval = null;
        this.init();
    }

    setCountdown() {
        console.log('setting countdown');
        let remainingMS = this.countdownMS;
        // hours
        this.hours = Math.floor(remainingMS / (60 * 60 * 1000));
        remainingMS -= this.hours * (60 * 60 * 1000);
        // minutes
        this.minutes = Math.floor(remainingMS / (60 * 1000));
        remainingMS -= this.minutes * (60 * 1000);
        // seconds
        this.seconds = Math.floor(remainingMS / (1000));
        remainingMS -= this.seconds * (1000);
        // output
        console.log(this.hours, this.minutes, this.seconds)
    }

    insertCSS() {
        try {
            const styleTag = document.createElement('style');
            const countdownStyles = `
                @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
                ${this.selector} {
                    width: 100%;
                    font-family: 'Roboto Condensed', sans-serif;
                    margin: 0 auto;
                }
                .countdown-row {
                    display: flex;
                    justify-content: center;
                }
                .countdown-col {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px;
                    margin: 10px;
                    border-radius: 10px;
                    width: 33%;
                    max-width: 150px;
                }
                .countdown-col.light {
                    background: #f1f1f1;
                    color: #444;
                }
                .countdown-col.dark {
                    background: #444;
                    color: #f1f1f1;
                }
                .countdown__number {
                    font-size: 64px;
                }
                .countdown__text {
                    font-size: 32px;
                }
            `;
            styleTag.innerHTML = countdownStyles;
            document.head.appendChild(styleTag);

        } catch(e) {
            console.log(e)
        }
    }

    insertHTML() {
        try {
            this.element = document.querySelector(this.selector);
            console.log(this.element);
            const countdownHTML = `
                <div class="countdown-row">
                    <div class="countdown-col ${this.theme}">
                        <div class="countdown__number hours">${this.hours}</div>
                        <div class="countdown__text">Hours</div>
                    </div>
                    <div class="countdown-col ${this.theme}">
                        <div class="countdown__number minutes">${this.minutes}</div>
                        <div class="countdown__text">Minutes</div>
                    </div>
                    <div class="countdown-col ${this.theme}">
                        <div class="countdown__number seconds">${this.seconds}</div>
                        <div class="countdown__text">Seconds</div>
                    </div>
                </div>
            `
            this.element.innerHTML = countdownHTML;

        } catch(e) {
            console.log(e)
        }
    }

    startCountdown() {
        this.countdownRunning = true;
        console.log('starting');

        if (this.countdownRunning && this.remainingSeconds > 0) {
            this.countdownInterval = setInterval(() => {
                if (this.remainingSeconds > 0) {
                    this.changeHours();
                    this.changeMinutes();
                    this.changeSeconds();
                    this.remainingSeconds -= 1;
                    console.log(this.remainingSeconds);
                }
                else {
                    this.stopCountdown();
                }

            }, 1000)
        }
    }

    stopCountdown() {
        console.log('stopping');
        this.countdownRunning = false;
        clearInterval(this.countdownInterval);
    }

    changeHours() {
        if (this.remainingSeconds > 0) {
            if (this.minutes == 0 && this.seconds == 0) {
                this.hours -= 1;
                this.updateHTML('hours');
            }
        }
    }

    changeMinutes() {
        if (this.remainingSeconds > 0) {
            if (this.seconds == 0 && this.minutes > 0 ) {
                this.minutes -= 1;
            }
            else if (this.seconds == 0 && this.minutes == 0) {
                this.minutes = 59;
            }
            this.updateHTML('minutes')
        }

    }

    changeSeconds() {
        console.log('changing seconds');
        if (this.remainingSeconds > 0) {
            if (this.seconds == 0) {
                this.seconds = 59;
            }
            else {
                this.seconds -= 1;
            }
            this.updateHTML('seconds');
            console.log('seconds: ', this.seconds);
        }
    }

    updateHTML(type) {
        var hoursHTML = document.querySelector('.countdown__number.hours');
        var minutesHTML = document.querySelector('.countdown__number.minutes');
        var secondsHTML = document.querySelector('.countdown__number.seconds');
        console.log('update ', type);
        type == 'hours' ? hoursHTML.innerHTML = this.hours : ''
        type == 'minutes' ? minutesHTML.innerHTML = this.minutes : ''
        type == 'seconds' ? secondsHTML.innerHTML = this.seconds : ''
    }

    init() {
        this.setCountdown();
        this.insertCSS();
        this.insertHTML();
        this.autoStart ? this.startCountdown() : ''
    }
}

var countdownConfig = {
    countdownEnd: '12 Jul 2023 12:00',
    countdownStart: '10 Jul 2023 12:00',
    selector: 'div#countdown',
    theme: 'light',
    autoStart: false,
}

var countdown = new Countdown();

const ctdButton = document.querySelector('.startCountdown');
ctdButton.addEventListener('click', () => {
    countdown.countdownRunning == false
        ? countdown.startCountdown()
        : countdown.stopCountdown()
})
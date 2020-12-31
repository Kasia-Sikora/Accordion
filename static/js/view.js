//TODO divide to view and controller classes

export class View {

    constructor() {
        this.accordinGroup = document.getElementById('accordionGroup');
        this.count = 1;
        this.svg = document.getElementById('alphasvg');
        this.svg.style.display = 'none';
    }

    displayCards = (data) => {
        data.user.accounts.forEach(account => this.displayAccordion(account));
        console.log(data)
        this.addListeners();
        this.setFocus();
    }

    createButton = (data) => {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-disabled', 'false');
        button.setAttribute('class', 'Accordion-trigger');
        button.setAttribute('aria-controls', `section${this.count}`);
        button.setAttribute('id', `accordion${this.count}`);
        const bankName = this.createBankName(data);
        const accordionTitle = this.createAccordionTitle(data);
        const menuIcon = this.createMenuIcon();
        button.appendChild(bankName);
        button.appendChild(accordionTitle);
        button.appendChild(menuIcon);
        return button;
    }

    displayAccordion = (data) => {
        const accordion = document.createElement('div');
        accordion.setAttribute('class', 'Accordion');
        const h3 = document.createElement('h3');
        const button = this.createButton(data);
        const section = this.createSection(data, this.count)
        h3.appendChild(button);
        accordion.appendChild(h3)
        accordion.appendChild(section);
        this.accordinGroup.appendChild(accordion)
        this.count++;
    }

    createBankName = (data) => {
        const bankName = document.createElement('div');
        bankName.setAttribute('class', 'bank-name');
        bankName.textContent = data.bankName;
        return bankName;
    }

    createAccordionTitle = (data) => {
        const accordionTitle = document.createElement('div');
        accordionTitle.setAttribute('class', 'Accordion-title');
        const accountDetails = document.createElement('div');
        accountDetails.setAttribute('class', 'account-details');
        const accountTitle = document.createElement('div');
        accountTitle.setAttribute('class', 'account-title');
        accountTitle.textContent = data.accountName;
        const accountNumber = document.createElement('div');
        accountNumber.setAttribute('class', 'account-number small');
        accountNumber.textContent = data.accountNumber;
        const availableFounds = this.createFoundsSection(data);
        accountDetails.appendChild(accountTitle)
        accountDetails.appendChild(accountNumber);
        accordionTitle.appendChild(accountDetails);
        accordionTitle.appendChild(availableFounds);
        return accordionTitle;
    }

    createMenuIcon = () => {
        const menuIcon = document.createElement('span');
        menuIcon.setAttribute('class', 'menu-icon');
        const svg = this.svg.cloneNode(true);
        svg.style.display = 'block'
        menuIcon.appendChild(svg);
        return menuIcon;
    }

    setFocus = (event) => {
        const listOfAccordions = document.querySelectorAll('.Accordion');
        if (event === undefined || event.type === 'click') {
            this.clickHandler(event, listOfAccordions)
        } else {
            this.keyHandler(event, listOfAccordions)
        }
    }

    createSection(data, count) {
        const section = document.createElement('div');
        section.setAttribute('id', `section${count}`)
        section.setAttribute('role', 'region')
        section.setAttribute('aria-labelledby', `accordion${count}`);
        section.setAttribute('class', "Accordion-panel");
        section.appendChild(this.createDetails(data, count))
        section.appendChild(this.createDetailButtons());
        return section;
    }

    createDetails = (data) => {
        const details = document.createElement('div');
        details.setAttribute('class', 'details');
        const balanceSection = document.createElement('div');
        balanceSection.setAttribute('class', 'balance-section');
        const balance = document.createElement('div');
        balance.setAttribute('class', 'balance small');
        balance.textContent = 'Saldo';
        const lock = document.createElement('div');
        lock.setAttribute('class', 'lock small');
        lock.textContent = 'Blokady';

        const availableFounds = this.createFoundsSection(data);
        lock.appendChild(this.createAmountSpan(data.locks));
        balance.appendChild(this.createAmountSpan(data.balance));
        balanceSection.appendChild(balance);
        balanceSection.appendChild(lock);
        details.appendChild(balanceSection)
        details.appendChild(availableFounds)
        return details;
    }

    createDetailButtons() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.setAttribute('class', 'buttons');
        const buttons = ['Szczegóły', 'Historia', 'Przelew'];
        buttons.forEach(elem => {
            let button = document.createElement('button');
            button.textContent = elem;
            buttonsContainer.appendChild(button);
        })
        return buttonsContainer;
    }

    addListeners() {
        const listOfAccordions = document.querySelectorAll('.Accordion');
        listOfAccordions.forEach(accordion => {
            accordion.addEventListener('click', this.setFocus);
            accordion.addEventListener('keydown', this.setFocus)
        })
    }

    //TODO Divide function
    clickHandler(event, listOfAccordions) {
        listOfAccordions.forEach(accordion => {
            if (accordion === (event === undefined ? listOfAccordions[0] : event.currentTarget)) {
                accordion.firstElementChild.firstElementChild.setAttribute('aria-expanded', 'true');
                accordion.firstElementChild.firstElementChild.setAttribute('aria-disabled', 'true');
                accordion.classList.add('focus');
                accordion.children[1].style.display = 'block';
            } else {
                accordion.firstElementChild.firstElementChild.setAttribute('aria-expanded', 'false');
                accordion.firstElementChild.firstElementChild.setAttribute('aria-disabled', 'false');
                accordion.children[1].style.display = 'none';
                if (accordion.classList.contains('focus')) {
                    accordion.classList.remove('focus')
                }
            }
        })
    }


    //TODO change logic
    keyHandler(event, listOfAccordions) {
        if (event.key === 'Home') {
            listOfAccordions[0].firstElementChild.firstElementChild.focus();
        } else if (event.key === 'End') {
            listOfAccordions[listOfAccordions.length - 1].firstElementChild.firstElementChild.focus();
        } else if (event.key === 'ArrowUp') {
            const newArray = Array.from(listOfAccordions)
            const currentAccordion = newArray.filter(accordion => accordion.firstElementChild.firstElementChild === document.activeElement);
            if (currentAccordion[0] === listOfAccordions[0]) {
                listOfAccordions[listOfAccordions.length - 1].firstElementChild.firstElementChild.focus();
            } else if (currentAccordion[0] === listOfAccordions[1]) {
                listOfAccordions[0].firstElementChild.firstElementChild.focus();
            } else if (currentAccordion[0] === listOfAccordions[2]) {
                listOfAccordions[1].firstElementChild.firstElementChild.focus();
            }
        } else if (event.key === 'ArrowDown') {
            const newArray = Array.from(listOfAccordions)
            const currentAccordion = newArray.filter(accordion => accordion.firstElementChild.firstElementChild === document.activeElement);
            if (currentAccordion[0] === listOfAccordions[0]) {
                listOfAccordions[1].firstElementChild.firstElementChild.focus();
            } else if (currentAccordion[0] === listOfAccordions[1]) {
                listOfAccordions[2].firstElementChild.firstElementChild.focus();
            } else if (currentAccordion[0] === listOfAccordions[2]) {
                listOfAccordions[0].firstElementChild.firstElementChild.focus();
            }
        }
    }

    //TODO change function name
    createCurrency = () => {
        const span = document.createElement('span');
        span.setAttribute('class', 'currency');
        span.textContent = " PLN";
        return span;
    }

    //TODO change function name
    createAmountSpan = (data) => {
        const span = document.createElement('span');
        span.setAttribute('class', "amount");
        if (data < 0) {
            span.style.color = '#CB2C1D';
        }
        span.textContent = this.convertCash(data);
        span.appendChild(this.createCurrency())
        return span;
    }

    createFoundsSection = (data) => {
        const availableFounds = document.createElement('div');
        availableFounds.setAttribute('class', 'available-funds');
        const foundsTitle = document.createElement('div');
        foundsTitle.setAttribute('class', 'funds-title small');
        foundsTitle.textContent = 'Dostępne środki';
        const accountBalance = document.createElement('div');
        accountBalance.setAttribute('class', 'account-balance');
        if (data.availableFunds < 0) {
            accountBalance.style.color = '#CB2C1D'
        }
        accountBalance.textContent = this.convertCash(data.availableFunds);
        availableFounds.appendChild(foundsTitle);
        if(data.specialHolder !== null){
            const specialHolder = document.createElement('div');
            specialHolder.setAttribute('class', 'special-holder small');
            specialHolder.textContent = `${data.specialHolder.title}: ${this.convertCash(data.specialHolder.amount)}`;
            specialHolder.appendChild(this.createCurrency());
            availableFounds.appendChild(specialHolder);
        }
        availableFounds.appendChild(accountBalance);
        accountBalance.appendChild(this.createCurrency());
        return availableFounds;
    }

    //TODO Refactor
    convertCash(data) {
        let amount = [];
        let data2 = (Math.abs(data).toFixed(2)).toString();
        let count = 0;
        for (let i = data2.length - 1; i >= 0; i--) {
            if (data2[i] === ".") {
                amount.unshift(',');
            } else if (i < data2.length - 2) {
                count = count === 3? 0 : count;
                count++;
                if (count % 3 === 0) {
                    amount.unshift(data2[i])
                    amount.unshift(' ')
                } else {
                    amount.unshift(data2[i])
                }

            } else {
                amount.unshift(data2[i])
            }
        }
        if(data < 0){
            amount.unshift('-')
        }
        return amount.join('');
    }
}

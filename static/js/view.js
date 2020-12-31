export class View {

    constructor(logic) {
        this.count = 1;
        this.svg = document.getElementById('menuButton');
        this.svg.style.display = 'none';
        this.logic = logic;
    }

    displayCards = (data) => {
        data.user.accounts.forEach(account => this.displayAccordion(account));
        this.logic.init();
    }

    createAccordionTrigger = (data) => {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('aria-expanded', 'false');
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
        const accordionGroup = document.getElementById('accordionGroup');
        const accordion = document.createElement('div');
        accordion.setAttribute('class', 'Accordion');
        const h3 = document.createElement('h3');
        const accordionTrigger = this.createAccordionTrigger(data);
        const accordionPanel = this.createAccordionPanel(data, this.count)
        h3.appendChild(accordionTrigger);
        accordion.appendChild(h3)
        accordion.appendChild(accordionPanel);
        accordionGroup.appendChild(accordion)
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
        svg.style.visibility = 'visible';
        svg.style.display = 'block';
        menuIcon.appendChild(svg);
        return menuIcon;
    }

    createAccordionPanel(data, count) {
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

    createDetailButtons = () => {
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

    createCurrencySpan = () => {
        const span = document.createElement('span');
        span.setAttribute('class', 'currency');
        span.textContent = " PLN";
        return span;
    }

    createAmountSpan = (data) => {
        const span = document.createElement('span');
        span.setAttribute('class', "amount");
        if (data < 0) span.style.color = '#CB2C1D';
        span.textContent = this.logic.convertCash(data);
        span.appendChild(this.createCurrencySpan())
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
        if (data.availableFunds < 0) accountBalance.style.color = '#CB2C1D';
        accountBalance.textContent = this.logic.convertCash(data.availableFunds);
        availableFounds.appendChild(foundsTitle);
        if(data.specialHolder !== null) availableFounds.appendChild(this.createSpecialHolder(data));
        availableFounds.appendChild(accountBalance);
        accountBalance.appendChild(this.createCurrencySpan());
        return availableFounds;
    }

    createSpecialHolder = (data) => {
        const specialHolder = document.createElement('div');
        specialHolder.setAttribute('class', 'special-holder small');
        specialHolder.textContent = `${data.specialHolder.title}: ${this.logic.convertCash(data.specialHolder.amount)}`;
        specialHolder.appendChild(this.createCurrencySpan());
        return specialHolder;
    }
}


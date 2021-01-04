import Utils from "./utils.js";
import Logic from "./logic.js";

export default class View {

    constructor() {
        this.count = 1;
        this.svg = document.querySelector('.menuButton');
        this.svg.style.display = 'none';
        this.logic = new Logic();
        this.utils = new Utils();
    }

    displayCards = (data) => {
        data.user.accounts.forEach(account => this.displayAccordion(account));
        this.logic.init();
    }

    createAccordionTrigger = (data) => {
        const button = this.utils.render(
            'button',
            {
                'type': 'button',
                'aria-expanded': 'false',
                'class': 'Accordion-trigger',
                'aria-controls': `section${this.count}`,
                'id': `accordion${this.count}`,
                'tabindex': "1"
            }
        )
        const bankName = this.utils.render('div', {'class': 'bank-name'}, data.bankName);
        const accordionTitle = this.createAccordionTitle(data);
        const menuIcon = this.createMenuIcon();
        button.appendChild(bankName);
        button.appendChild(accordionTitle);
        button.appendChild(menuIcon);
        return button;
    }

    displayAccordion = (data) => {
        const accordionGroup = document.getElementById('accordionGroup');
        const accordion = this.utils.render('div', {'class': 'Accordion'})
        const h3 = document.createElement('h3');
        const accordionTrigger = this.createAccordionTrigger(data);
        const accordionPanel = this.createAccordionPanel(data)
        h3.appendChild(accordionTrigger);
        accordion.appendChild(h3)
        accordion.appendChild(accordionPanel);
        accordionGroup.appendChild(accordion)
        this.count++;
    }

    createAccordionTitle = (data) => {
        const accordionTitle = this.utils.render('div', {'class': 'Accordion-title'})
        const accountDetails = this.utils.render('div', {'class': 'account-details'})
        const accountTitle = this.utils.render('div', {'class': 'account-title'}, data.accountName)
        const accountNumber = this.utils.render('div', {'class': 'account-number small'}, data.accountNumber)
        const availableFounds = this.createFoundsSection(data);
        accountDetails.appendChild(accountTitle)
        accountDetails.appendChild(accountNumber);
        accordionTitle.appendChild(accountDetails);
        accordionTitle.appendChild(availableFounds);
        return accordionTitle;
    }

    createMenuIcon = () => {
        const menuIcon = this.utils.render('span', {'class': 'menu-icon'})
        const svg = this.svg.cloneNode(true);
        svg.style.visibility = 'visible';
        svg.style.display = 'block';
        menuIcon.appendChild(svg);
        return menuIcon;
    }

    createAccordionPanel(data) {
        const section = this.utils.render('div', {
            'id': `section${this.count}`,
            'role': 'region',
            'aria-labelledby': `accordion${this.count}`,
            'class': 'Accordion-panel',
        })
        section.appendChild(this.createDetails(data))
        section.appendChild(this.createDetailButtons());
        return section;
    }

    createDetails = (data) => {
        const details = this.utils.render('div', {'class': 'details'})
        const balanceSection = this.utils.render('div', {'class': 'balance-section'})
        const balance = this.utils.render('div', {'class': 'balance small'}, 'Saldo');
        const lock = this.utils.render('div', {'class': 'lock small'}, 'Blokady');
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
        const buttonsContainer = this.utils.render('div', {'class': 'buttons'})
        const buttons = ['Szczegóły', 'Historia', 'Przelew'];
        buttons.forEach(elem => {
            let button = this.utils.render('button', {'tabindex': "1"}, elem);
            buttonsContainer.appendChild(button);
        })
        return buttonsContainer;
    }

    createAmountSpan = (data) => {
        const amountSpan = this.utils.render('span', {'class': 'amount'}, this.utils.convertCash(data))
        if (data < 0) amountSpan.style.color = '#CB2C1D';
        amountSpan.appendChild(this.utils.render('span', {'class': 'currency'}, ' PLN'));
        return amountSpan;
    }

    createFoundsSection = (data) => {
        const availableFounds = this.utils.render('div', {'class': 'available-funds'});
        const foundsTitle = this.utils.render('div', {'class': 'funds-title small'}, 'Dostępne środki')
        const accountBalance = this.utils.render('div', {'class': 'account-balance'}, this.utils.convertCash(data.availableFunds))
        if (data.availableFunds < 0) accountBalance.style.color = '#CB2C1D';
        availableFounds.appendChild(foundsTitle);
        if (data.specialHolder !== null) availableFounds.appendChild(this.createSpecialHolder(data));
        availableFounds.appendChild(accountBalance);
        accountBalance.appendChild(this.utils.render('span', {'class': 'currency'}, ' PLN'));
        return availableFounds;
    }

    createSpecialHolder = (data) => {
        const specialHolder = this.utils.render('div', {'class': 'special-holder small'},
            `${data.specialHolder.title}: ${this.utils.convertCash(data.specialHolder.amount)}`)
        specialHolder.appendChild(this.utils.render('span', {'class': 'currency'}, ' PLN'));
        return specialHolder;
    }
}


export class Logic {

    init = () =>  {
        this.addListeners();
        this.setFocus();
    }

    addListeners = () => {
        const listOfAccordions = document.querySelectorAll('.Accordion');
        listOfAccordions.forEach(accordion => {
            accordion.addEventListener('click', this.setFocus);
            accordion.addEventListener('keydown', this.setFocus)
        })
    }

    setFocus = (event) => {
        const listOfAccordions = document.querySelectorAll('.Accordion');
        if (event === undefined || event.type === 'click') {
            this.clickHandler(event, listOfAccordions)
        } else {
            this.keyHandler(event)
        }
    }

    clickHandler = (event, listOfAccordions) => {
        listOfAccordions.forEach(accordion => {
            accordion === (event === undefined ? listOfAccordions[0] : event.currentTarget) ?
                this.expandPanel(accordion, true) :
                this.expandPanel(accordion, false);
        })
    }

    keyHandler = (event) => {
        const listOfAccordions = document.querySelectorAll('.Accordion-trigger');
        const currentAccordion = [...listOfAccordions].filter(accordion => accordion === document.activeElement)[0];
        switch (event.key) {
            case 'Home':
                listOfAccordions[0].focus();
                break;
            case 'End':
                listOfAccordions[listOfAccordions.length - 1].focus();
                break;
            case 'ArrowUp':
                this.changeFocus(listOfAccordions, currentAccordion, -1);
                break;
            case 'ArrowDown':
                this.changeFocus(listOfAccordions, currentAccordion, 1);
                break;
        }
    }

    expandPanel = (accordion, boolean) => {
        accordion.firstElementChild.firstElementChild.setAttribute('aria-expanded', boolean);
        if(boolean) {
            accordion.classList.add('focus');
            accordion.children[1].style.display = 'block';
        }else{
            accordion.children[1].style.display = 'none';
            if (accordion.classList.contains('focus')) {
                accordion.classList.remove('focus')
            }
        }
    }

    convertCash = (data) => {
        let amount = [];
        const money = (Math.abs(data).toFixed(2)).toString().replace('.', ',');

        let count = 0;
        for (let i = money.length - 1; i >= 0; i--) {
            if (i < money.length - 3) {
                count = (count === 3)? 0 : count;
                count++;
                if (count % 3 === 0) {
                    amount.unshift(money[i]);
                    amount.unshift(' ');
                } else {
                    amount.unshift(money[i]);
                }
            } else {
                amount.unshift(money[i]);
            }
        }
        if(data < 0) amount.unshift('-');
        return amount.join('');
    }

    changeFocus(listOfAccordions, currentAccordion, direction) {
        if (currentAccordion === listOfAccordions[0] && direction < 0) {
            listOfAccordions[listOfAccordions.length - 1].focus();
        }else if(currentAccordion === listOfAccordions[listOfAccordions.length - 1] && direction > 0){
            listOfAccordions[0].focus();
        }else {
            const index = [...listOfAccordions].indexOf(currentAccordion);
            listOfAccordions[index + direction].focus();
        }
    }
}

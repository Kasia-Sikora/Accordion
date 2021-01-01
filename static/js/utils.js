export default class Utils {

    convertCash = (data) => {
        let amount = [];
        const money = (Math.abs(data).toFixed(2)).toString().replace('.', ',');

        let count = 0;
        for (let i = money.length - 1; i >= 0; i--) {
            if (i < money.length - 3) {
                count = (count === 3) ? 0 : count;
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
        if (data < 0) amount.unshift('-');
        return amount.join('');
    }

    render(element, attributes, textContent) {
        const newNode = document.createElement(element);
        if (attributes !== {}) {
            for(const [key, value] of Object.entries(attributes))
                newNode.setAttribute(key, value);
            }
        if(textContent !== undefined) newNode.textContent = textContent;
        return newNode;
    }

}

/**
 * Increase/Decrease Input class
 */
const {content} = document.getElementById('increase-decrease-template') as HTMLTemplateElement

export class IncreaseDecreaseInput extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super()
        // write element functionality in here
        this.attachShadow({mode: 'open'})
        // get the template
        this.shadowRoot?.appendChild(content)
    }

    connectedCallback(): void {
        try {
            const increaseButton = this.getIncreaseButton()
            const decreaseButton = this.getDecreaseButton()
            increaseButton.addEventListener('click', () => {
                this.increaseValue()
            })
            decreaseButton.addEventListener('click', () => {
                this.decreaseValue()
            })
        } catch (e) {
            console.error('Web component IncreaseDecreaseInput: ' + e)
        }
    }

    increaseValue() {
        const numberInput = this.getNumberInput()
        let value = parseInt(numberInput.value, 10)
        value = isNaN(value) ? 0 : value
        value++
        numberInput.value = String(value)
    }

    decreaseValue() {
        const numberInput = this.getNumberInput()
        let value = parseInt(numberInput.value, 10)
        value = isNaN(value) ? 0 : value
        value < 1 ? value = 1 : ''
        value--
        numberInput.value = String(value)
    }

    getIncreaseButton(): HTMLElement {
        const increaseButton = this.shadowRoot?.querySelector('button#increase')
        if (increaseButton instanceof HTMLElement) {
            return increaseButton
        }
        throw new Error('HTMLElement button with id `increase` does not found in template')
    }

    getDecreaseButton(): HTMLElement {
        const decreaseButton = this.shadowRoot?.querySelector('button#decrease')
        if (decreaseButton instanceof HTMLElement) {
            return decreaseButton
        }
        throw new Error('HTMLElement button with id `decrease` does not found in template')
    }

    getNumberInput(): HTMLInputElement {
        const numberInput = this.shadowRoot?.querySelector('input#number')
        if (numberInput instanceof HTMLInputElement) {
            return numberInput
        }
        throw new Error('HTMLElement input with id `number` does not found in template')
    }
}

/**
 * Define the new custom element `increase-decrease`
 */
window.customElements.define('increase-decrease', IncreaseDecreaseInput)

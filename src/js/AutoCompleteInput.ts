/**
 * Autocomplete Input class
 */
const template = document.createElement("template");
template.innerHTML = `
<style> 
    input {all: unset;}
    div {display: inline; position: relative; width: fit-content}
    ul {position: absolute; list-style-type: none; margin: 0; padding: 0; width: calc(100% + 20px);}
    li {padding: 5px 10px; cursor: pointer; background-color: var(--color-silver, silver);}
    li:hover {background-color: var(--color-gray, gray);}
    .active {background-color: var(--color-blue, dodgerblue); color: var(--color-white, white);} 
</style>
`;

export class AutoCompleteInput extends HTMLElement {
    private readonly autocompleteList: HTMLElement
    private hiddenField: HTMLInputElement
    private currentFocus: number

    constructor() {
        // Always call super first in constructor
        super()
        // write element functionality in here
        this.currentFocus = -1
        this.attachShadow({mode: 'open'})
        // create a <ul> element that will contain the items (values)
        this.autocompleteList = document.createElement("ul")
        this.hiddenField = this.querySelector('input[type="hidden"]') as HTMLInputElement
        this.shadowRoot?.appendChild(template.content.cloneNode(true))
        this.shadowRoot?.appendChild(this.createAutoCompleteElement())
    }

    static get observedAttributes() {
        return ["value", "name"];
    }

    connectedCallback(): void {
        // fires after the element has been attached to the DOM
        const element = this.shadowRoot?.querySelector('input')
        if (!element) return
        // execute a function when someone writes in the text field
        element.addEventListener('input', () => {
            // close any already open lists of autocompleted values
            this.closeAllLists()
            if (!element.value) {
                return false
            }
            const items = this.getData()
            items.forEach(item => {
                if (item.substring(0, element.value.length).toUpperCase() == element.value.toUpperCase()) {
                    // create a <li> element for each matching element
                    const autocompleteListItem = document.createElement("li");
                    autocompleteListItem.innerHTML = item;
                    // execute a function when someone clicks on the item value (List element)
                    autocompleteListItem.addEventListener("click", () => {
                        // insert the value for the autocomplete text field
                        element.value = item;
                        this.hiddenField.value = item
                        this.closeAllLists()
                    });
                    this.autocompleteList.appendChild(autocompleteListItem);
                }
            })
            return true
        })

        // execute a function presses a key on the keyboard
        element.addEventListener("keydown", (e) => {
            const listHTMLCollection = this.autocompleteList.getElementsByTagName("li")
            if (e.key === 'ArrowDown') {
                // if the arrow DOWN key is pressed, increase the currentFocus variable
                this.currentFocus++
                // make the current item more visible
                this.addActive(listHTMLCollection);
            } else if (e.key === 'ArrowUp') {
                // if the arrow UP key is pressed, decrease the currentFocus variable
                this.currentFocus--
                // make the current item more visible
                this.addActive(listHTMLCollection)
            } else if (e.key === 'Enter') {
                // if the ENTER key is pressed, prevent the form from being submitted
                e.preventDefault()
                if (this.currentFocus > -1) {
                    // and simulate a click on the "active" item
                    if (listHTMLCollection.length) listHTMLCollection[this.currentFocus].click()
                }
            }
        })

        // execute a function when someone clicks in the document
        document.addEventListener("click", () => {
            this.closeAllLists();
        });
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch (name) {
            case "name":
                this.hiddenField.setAttribute("name", newValue)
                break;
            case "value":
                this.hiddenField.setAttribute("value", newValue)
                break;
            default:
                break;
        }
    }

    get value() {
        return this.getAttribute("value")
    }

    set value(newValue) {
        if (newValue) {
            this.setAttribute("value", newValue)
        }
    }

    createAutoCompleteElement(): HTMLElement {
        const div = document.createElement("div")
        const input = document.createElement("input")
        input.type = "search"
        div.appendChild(input)
        // append the <ul> element as a child of the autocomplete shadow root
        div.appendChild(this.autocompleteList)
        return div
    }

    addActive(listHTMLCollection: HTMLCollection): boolean {
        // a function to classify an item as "active"
        if (!listHTMLCollection) return false
        // start by removing the "active" class on all items
        this.removeActive(listHTMLCollection)
        if (this.currentFocus >= listHTMLCollection.length) this.currentFocus = 0
        if (this.currentFocus < 0) this.currentFocus = (listHTMLCollection.length - 1)
        // add class autocomplete is "active"
        listHTMLCollection[this.currentFocus].classList.add("active")
        return true
    }

    removeActive(listHTMLCollection: HTMLCollection): void {
        // a function to remove the "active" class from all autocomplete items
        for (let i = 0; i < listHTMLCollection.length; i++) {
            listHTMLCollection[i].classList.remove("active");
        }
    }

    closeAllLists(): void {
        // remove all autocomplete list elements
        let first = this.autocompleteList.firstElementChild;
        while (first) {
            first.remove();
            first = this.autocompleteList.firstElementChild;
        }
    }

    getData(): string[] {
        // An array containing all the country names in the world
        return ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    }
}

/**
 * Define the new custom element `auto-complete`
 */
window.customElements.define('auto-complete', AutoCompleteInput)

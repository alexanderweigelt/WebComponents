/**
 * Styles
 */
import './css/main.scss'


/**
 * Get web components
 */
import {AutoCompleteInput} from "./js/AutoCompleteInput";
import {IncreaseDecreaseInput} from "./js/IncreaseDecreaseInput";


/**
 * Define the new custom elements
 */
window.customElements.define('auto-complete', AutoCompleteInput)
window.customElements.define('increase-decrease', IncreaseDecreaseInput)

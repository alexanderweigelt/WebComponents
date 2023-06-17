import {LitElement, html, css} from 'lit';
import {property, state, customElement} from 'lit/decorators.js';
import {icon, IconParams} from "@fortawesome/fontawesome-svg-core"
import {faStar as faStarSolid, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faStarHalfStroke as faStarHalfRegular, faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";

@customElement('rating-stars')
export class RatingStars extends LitElement {
    private stars: any[]

    constructor() {
        super();
        this.stars = new Array(this.totalStars).fill(null)
    }

    static styles = css`
        :host {
            color: var(--color-blue, dodgerblue);
            background: var(--color-white, white);
            font-size: var(--font-base, 1em);
            display: block;
        }

        [class^="rating-star-size-"] {
            display: flex;
            flex-wrap: nowrap;
        }
        
        .rating-star-size-sm {
            height: var(--font-sm, .8em);
        }

        .rating-star-size-md {
            height: var(--font-md, 1em);
        }

        .rating-star-size-lg {
            height: var(--font-lg, 1.6em);
        }

        .rating-star-size-xl {
            height: var(--font-xl, 2.4em);
        }
    `;

    @state()
    totalStars = 5

    @property({type: Number})
    average = 0

    @property({type: String})
    size: "sm" | "md" | "lg" | "xl" = "md"

    protected iconNode(iconDefinition: IconDefinition, params: IconParams = {}) {
        const i = icon(iconDefinition, params)
        return Array.from(i.node).map(n => {
            return n
        })
    }

    protected render() {
        return html`<span class="rating-star-size-${this.size}">
            ${this.getStars().map((icon) => (
                html`${icon}`
            ))}
        </span>`
    }

    protected getStars(): [] | Element[][] {
        const ratingBar: Element[][] = []
        const fullStars = Math.trunc(this.average)
        const partialStar = this.average - fullStars
        this.stars.forEach((_, index) => {
                if (index < fullStars) {
                    ratingBar[index] = this.iconNode(faStarSolid)
                } else if (index <= fullStars && partialStar !== 0) {
                    ratingBar[index] = this.iconNode(faStarHalfRegular)
                } else {
                    ratingBar[index] = this.iconNode(faStarRegular)
                }
            }
        )
        return ratingBar
    }
}

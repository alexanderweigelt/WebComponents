# Web Components

A lightweight web components example. Web Components are a set of features that provide a standard component model for 
the Web allowing for encapsulation and interoperability of individual HTML elements.

## Examples

| Name                  | Description                                                                                               | Code                     | Attributes            |
|-----------------------|-----------------------------------------------------------------------------------------------------------|--------------------------|-----------------------|
| AutoCompleteInput     | An input field with generated auto suggestions as drop down.                                              | ``` <auto-complete> ```  | * name <br/>* value   |
| IncreaseDecreaseInput | Custom input field to change the quantity, e.g. to choose a product amount.                               | ```<increase-decrese>``` |                       |
| RatingStars           | Rating stars tells users that the page is trustworthy and that past users have rated it in a certain way. | ```<rating-stars>```     | * average <br/>* size |

See it in action: https://alexanderweigelt.github.io/WebComponents/

## Usage

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

To lint your code

```sh
npm run lint
```

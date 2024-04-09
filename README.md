
# Frontend Mentor - Audiophile e-commerce website solution

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add/Remove products from the cart
- Edit product quantities in the cart
- Fill in all fields in the checkout
- Receive form validations if fields are missed or incorrect during checkout
- See correct checkout totals depending on the products in the cart
  - Shipping always adds $50 to the order
  - VAT is calculated as 20% of the product total, excluding shipping
- See an order confirmation modal after checking out with an order summary
- Keep track of what's in the cart, even after refreshing the browser

### Screenshot

![mobile version of the solution](./mobile-view.png)
![desktop version of the solution](./desktop-view.png)

### Links

- Solution URL: [The github repository](https://github.com/jay-ike/audiophile-ecomerce)
- Live Site URL: [The interactive website](https://jay-ike-ecommerce.vercel.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- CSS Border image
- [Solid](https://www.solidjs.com/) - JS library


### What I learned


In css term I've enjoy using the `border-image` property particularly to fill more space thanks to the border-image outset

```css
:is(.light-bg, .c-form) {
    border-image: linear-gradient(hsl(0, 0%, 95%), hsl(0, 0%, 95%)) 1 fill / 1 / 50vh;
}
```
In Javascript I've used the resizeObserver to listen to the window size change and remove the menu even if it's open
```js
const observer = new ResizeObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.borderBoxSize[0].inlineSize >= 768) {
                delete entry.target.dataset.menuOpened;
            }
        });
    });
observer.observe(window);
```


### Continued development

This web app can be improved with serviceworker to handle the offline state of the web app

### Useful resources

- [Mozilla developer network](https://developer.mozilla.com) - This is where I usually go when looking for documentation even though for more in-depth knowledge I recommend reading the specifications


## Author

- Frontend Mentor - [@jay-ike](https://www.frontendmentor.io/profile/jay-ike)
- Mastodon - [@ndimah22@mastodon.social](https://mastodon.social/@ndimah22)

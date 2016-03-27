module.exports = {
    defaultLocale: 'pl',
    resources: {
        pl: {
            app: {
                appName: 'Corpo food',
                uniqueValueProposition: ' orderuj food bez fakapu'
            },
            dashboard: {
                noOrdersYet: 'Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy',
                addOrder: 'DODAJ ORDER'
            },
            orderTile: {
                deadline: 'Deadlajn:',
                author: 'Fokusuje się:',
                alreadyOrdered: 'os. już zamówiły'
            },
            newOrderForm: {
                restaurant: 'Lokal',
                orderingAt: 'Zamawiam o',
                deliveryAt: 'Zamawiam na',
                menu: 'Menu',
                description: 'Opis',
                password: 'Hasło administracyjne',
                passwordAgain: 'Powtórz hasło',
                author: 'Autor',
                currency: 'zł',
                deliveryCost: 'Koszt dowozu',
                extraCostPerMeal: 'Do każdego zamówienia',
                validationMessages: {
                    provideRestaurant: 'Prosze podać lokal',
                    provideValidHour: 'Podaj poprawną godzinę',
                    provideMenuLink: 'Proszę podać odnośnik do menu',
                    passwordTooShort: 'Minimalna długość hasła wynosi 6 znaków',
                    passwordsDontMatch: 'Hasła nie są takie same',
                    provideAuthor: 'Proszę podać autora zamówienia',
                    provideValidDeliveryCost: 'Podaj poprawny koszt dostawy',
                    provideValidExtraCostPerMeal: 'Podaj poprawny koszt do każdego zamówienia'
                }
            }
        },
        en: {
            app: {
                appName: 'Corpo food',
                uniqueValueProposition: ' order food without fuckups'
            },
            dashboard: {
                noOrdersYet: 'Nobody is on the task yet - be first',
                addOrder: 'ADD ORDER'
            },
            orderTile: {
                deadline: 'Deadline:',
                author: 'On the task:',
                alreadyOrdered: 'have already ordered'
            },
            newOrderForm: {
                restaurant: 'Restaurant',
                orderingAt: 'Calling at',
                deliveryAt: 'I want food at',
                menu: 'Menu',
                description: 'Description',
                password: 'Password',
                passwordAgain: 'Repeat password',
                author: 'Author',
                deliveryCost: 'Delivery cost',
                currency: 'Ł',
                extraCostPerMeal: 'Extra cost per meal',
                validationMessages: {
                    provideRestaurant: 'Provide restaurant name',
                    provideValidHour: 'Provide valid hour',
                    provideMenuLink: 'Provide menu link',
                    passwordTooShort: 'Password must be at least 6 characters short',
                    passwordsDontMatch: 'Passwords are not the same',
                    provideAuthor: 'Provide author',
                    provideValidDeliveryCost: 'Provide valid delivery cost',
                    provideValidExtraCostPerMeal: 'Provide valid extra cost per meal'
                }
            }
        }
    }
};

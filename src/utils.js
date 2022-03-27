
export const root = "https://image.tmdb.org/t/p/w185";

export const API_KEY = "210d6a5dd3f16419ce349c9f1b200d6d";


//Custom function for checking input errors by regex
export const checkError = (type, value) => {


    switch (type) {

        case 'email':

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {

                return "Introduce a valid email";
            } else {
                return "ok";
            };


        case 'name':

            if (! /[A-Za-zÀ-ÖØ-öø-ÿ ]/gi.test(value)) {
                return "Introduce a valid name (without numbers)";
            } else {
                return "ok";
            };

        case 'surname':

            if (! /[A-Za-zÀ-ÖØ-öø-ÿ ]/gi.test(value)) {
                return "Introduce a valid surname (without numbers)";
            } else {
                return "ok";
            };

        case 'age':

            if (! /^[0-9]*$/gi.test(value)) {
                return "Introduce a valid age (only numbers";
            } else {
                return "ok";
            };

        case 'phone':

            if (! /[\d()+-]/g.test(value)) {
                return "Introduce a valid phone";
            } else {
                return "ok";
            };


        default:
            return "ok";


    }
};
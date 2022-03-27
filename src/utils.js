
export const root = "https://image.tmdb.org/t/p/w185";

export const API_KEY = "210d6a5dd3f16419ce349c9f1b200d6d";


//Custom function for checking input errors by regex
export const checkError = (type, value) => {


    switch (type) {

        case 'nickname':
        case 'email':
        case 'password':
        case 'password2':

            if (value == "") {
                return `${type} field can not be empty`
            } else {
                return "ok"
            }

        case 'email':

            if (value !== "") {
                if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {

                    return "Introduce a valid email";
                } else {
                    return "ok";
                };
            } else {
                return "Email field can not be empty"
            }


        case 'name':

            if (value !== "") {
                if (! /[A-Za-zÀ-ÖØ-öø-ÿ ]/gi.test(value)) {
                    return "Introduce a valid name (without numbers)";
                } else {
                    return "ok";
                };
            } else {
                return "Name field can not be empty"
            }



        case 'surname':

            if (value !== "") {
                if (! /[A-Za-zÀ-ÖØ-öø-ÿ ]/gi.test(value)) {
                    return "Introduce a valid surname (without numbers)";
                } else {
                    return "ok";
                };
            } else {
                return "Surname field can not be empty"
            }



        case 'age':

            if (value !== "") {
                if (! /^[0-9]*$/gi.test(value)) {
                    return "Introduce a valid age (only numbers";
                } else {
                    return "ok";
                };
            } else {
                return "Age field can not be empty"
            }



        case 'phone':

            if (value !== "") {
                if (! /[\d()+-]/g.test(value)) {
                    return "Introduce a valid phone";
                } else {
                    return "ok";
                };
            } else {
                return ("Phone field can not be empty")
            }




        default:
            return "ok";


    }
};
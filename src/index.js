import React from "react";
import ReactDOM from "react-dom";
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEnMessages from "./locales/en";
import localeEsMessages from "./locales/es";
import * as serviceWorker from './serviceWorker';

import Login from "./components/login";

addLocaleData(esLocaleData);

function lenguaSelector(){
   if (window.navigator.language.startsWith("es")) {
        return (localeEsMessages);
   }else{
        return localeEnMessages;
   }

}

ReactDOM.render(
	<IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
		<Login/>
	</IntlProvider>, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
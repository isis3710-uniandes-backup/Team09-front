import React from "react";
import ReactDOM from "react-dom";
/*import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEnMessages from "./locales/en";
import localeEsMessages from "./locales/es";*/
import { makeMainRoutes } from './routes';

//addLocaleData(esLocaleData);

const routes = makeMainRoutes();

/*function lenguaSelector(){
   if (window.navigator.language.startsWith("es")) {
        return (localeEsMessages);
   }else{
        return localeEnMessages;
   }
<IntlProvider locale={window.navigator.language} messages= {lenguaSelector()}>
		<Login/>
	</IntlProvider>
}*/

ReactDOM.render(routes, document.getElementById("root")
);
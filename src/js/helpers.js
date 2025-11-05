import Accordion from "accordion-js";
//import "accordion-js/dist/accordion.min.css";

function initialAccordion() {    
    const params = {
        duration: 350,
        showMultiple: false,
        elementClass: "accordion-item",
        triggerClass: "accordion-trigger",
        panelClass: "accordion-panel",
        activeClass: "accordion-active",
    };    
    
    return new Accordion(".accordion-list", params);
}

export { initialAccordion };
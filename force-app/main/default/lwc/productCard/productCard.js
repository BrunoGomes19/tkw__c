/* eslint-disable no-undef */
/* eslint-disable @lwc/lwc/no-document-query */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

/** Wire adapter to load records, utils to extract values. */
import { getRecord } from 'lightning/uiRecordApi';

/** Pub-sub mechanism for sibling component communication. */
import { registerListener, unregisterAllListeners } from 'c/pubsub';

/** Product__c Schema. */
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import PRODUCT_OBJECTX from '@salesforce/schema/Product2';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import PRODUCT_ID from '@salesforce/schema/Product__c.Product_ID__c';
import PRODUCT_IDX from '@salesforce/schema/Product2.Product_ID__c';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import BATTERY_FIELD from '@salesforce/schema/Product__c.Battery__c';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import MODCOMP_FIELD from '@salesforce/schema/Product__c.Modelo_Componente__c';
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';
import CHARGER_FIELD from '@salesforce/schema/Product__c.Charger__c';
import FORK_FIELD from '@salesforce/schema/Product__c.Fork__c';
import FRONTBRAKES_FIELD from '@salesforce/schema/Product__c.Front_Brakes__c';
import REARBRAKES_FIELD from '@salesforce/schema/Product__c.Rear_Brakes__c';
import MOTOR_FIELD from '@salesforce/schema/Product__c.Motor__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Product__c.Description__c';


/** Record fields to load. */
const fields = [
    NAME_FIELD,
    LEVEL_FIELD,
    CATEGORY_FIELD,
    MATERIAL_FIELD,
    MSRP_FIELD,
    PICTURE_URL_FIELD,
    PRODUCT_ID,
    PRODUCT_IDX,
    BATTERY_FIELD,
    MODCOMP_FIELD,
    CHARGER_FIELD,
    FORK_FIELD,
    FRONTBRAKES_FIELD,
    REARBRAKES_FIELD,
    MOTOR_FIELD,
    DESCRIPTION_FIELD
];


/**
 * Component to display details of a Product__c.
 */
export default class ProductCard extends NavigationMixin(LightningElement) {
    /** Id of Product__c to display. */
    recordId;
    

    @wire(CurrentPageReference) pageRef;

    /** Load the Product__c to display. */
    @wire(getRecord, { recordId: '$recordId', fields : fields})
    product;

    get isModel(){

        return this.product.data.fields.Modelo_Componente__c.value === 'Model';

    }
    

    connectedCallback() {
        registerListener('productSelected', this.handleProductSelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    /**
     * Handler for when a product is selected. When `this.recordId` changes, the @wire
     * above will detect the change and provision new data.
     */
    handleProductSelected(productId) {
        this.recordId = productId;
        //alert(this.product.data.fields.Modelo_Componente__c.value);
        alert(this.product.data.fields.Battery__c.value);
          if(this.product.data.fields.Battery__c.value === "null" || this.product.data.fields.Battery__c.value === null || this.product.data.fields.Battery__c.value === ""){

   
            this.product.data.fields.Battery__c.value = 'Not Applicable';

            alert(this.product.data.fields.Battery__c.value);
            alert(product.data.fields.Battery__c.value);
        
        }

        /*
        if(this.product.data.fields.Modelo_Componente__c.value === 'Component'){
           alert(1);
           
            document.getElementById("modelo").style.display = "none";

            document.getElementById("componente").style.display = "block";

     
        }else if(this.product.data.fields.Modelo_Componente__c.value === 'Model'){
            alert(2);

            document.getElementById("modelo").style.display = "block";

            document.getElementById("componente").style.display = "none";

        }else{
            
            alert('Erro!');

        }
        */

    }

    handleNavigateToRecord() {
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: PRODUCT_OBJECTX.objectApiName,
                actionName: 'view'
            }
        });
    }

    get noData() {
        return !this.product.error && !this.product.data;
    }

    handleClick(){
        window.location.replace("https://tekkon-wheels-dev-ed.lightning.force.com/lightning/n/Customization");

    }
}

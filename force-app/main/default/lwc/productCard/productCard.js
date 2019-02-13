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
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Category__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import MSRP_FIELD from '@salesforce/schema/Product__c.MSRP__c';
import PICTURE_URL_FIELD from '@salesforce/schema/Product__c.Picture_URL__c';

/** Record fields to load. */
const fields = [
    NAME_FIELD,
    LEVEL_FIELD,
    CATEGORY_FIELD,
    MATERIAL_FIELD,
    MSRP_FIELD,
    PICTURE_URL_FIELD,
    PRODUCT_ID,
    PRODUCT_IDX
];

/**
 * Component to display details of a Product__c.
 */
export default class ProductCard extends NavigationMixin(LightningElement) {
    /** Id of Product__c to display. */
    recordId;
    

    @wire(CurrentPageReference) pageRef;

    /** Load the Product__c to display. */
    @wire(getRecord, { recordId: '$recordId', fields })
    product;
    
    

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

        // eslint-disable-next-line no-console
        console.log(PRODUCT_IDX);

        // eslint-disable-next-line no-console
        console.log(JSON.stringify(PRODUCT_IDX));

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

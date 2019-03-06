/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @lwc/lwc/no-document-query */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

/** Wire adapter to load records, utils to extract values. */
import { getRecord } from 'lightning/uiRecordApi';

import getForks from '@salesforce/apex/AccountContactController.getForks';

/** Pub-sub mechanism for sibling component communication. */
import { registerListener, unregisterAllListeners } from 'c/pubsub';

/** Product__c Schema. */
//import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
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

import FRAME_FIELD from '@salesforce/schema/Product__c.Frame__c';
import FRONTWHEEL_FIELD from '@salesforce/schema/Product__c.Front_Wheel__c';
import HEADSET_FIELD from '@salesforce/schema/Product__c.Head_Set__c';
import PEDALS_FIELD from '@salesforce/schema/Product__c.Pedals__c';
import REARWHEEL_FIELD from '@salesforce/schema/Product__c.Rear_Wheel__c';
import SADDLE_FIELD from '@salesforce/schema/Product__c.Saddle__c';
import List from 'c/list';

import BATTERYID_FIELD from '@salesforce/schema/Product__c.Battery_Id__c';
import CHARGERID_FIELD from '@salesforce/schema/Product__c.Charger_Id__c';
import FORKID_FIELD from '@salesforce/schema/Product__c.Fork_Id__c';
import FRAMEID_FIELD from '@salesforce/schema/Product__c.Frame_Id__c';
import FRONTBRAKESID_FIELD from '@salesforce/schema/Product__c.Front_Brakes_Id__c';
import FRONTWHEELID_FIELD from '@salesforce/schema/Product__c.Front_Wheel_Id__c';
import HEADSETID_FIELD from '@salesforce/schema/Product__c.Head_Set_Id__c';
import MOTORID_FIELD from '@salesforce/schema/Product__c.Motor_Id__c';
import PEDALSID_FIELD from '@salesforce/schema/Product__c.Pedals_Id__c';
import REARBRAKESID_FIELD from '@salesforce/schema/Product__c.Rear_Brakes_Id__c';
import REARWHEELID_FIELD from '@salesforce/schema/Product__c.Rear_Wheel_Id__c';
import SADDLEID_FIELD from '@salesforce/schema/Product__c.Saddle_Id__c';


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
    DESCRIPTION_FIELD,
    FRAME_FIELD,
    FRONTWHEEL_FIELD,
    HEADSET_FIELD,
    PEDALS_FIELD,
    REARWHEEL_FIELD,
    SADDLE_FIELD,
    BATTERYID_FIELD,
    CHARGERID_FIELD,
    FORKID_FIELD,
    FRAMEID_FIELD,
    FRONTBRAKESID_FIELD,
    FRONTWHEELID_FIELD,
    HEADSETID_FIELD,
    MOTORID_FIELD,
    PEDALSID_FIELD,
    REARBRAKESID_FIELD,
    REARWHEELID_FIELD,
    SADDLEID_FIELD,
];


/**
 * Component to display details of a Product__c.
 */
export default class ProductCard extends NavigationMixin(LightningElement) {

    @wire(getForks) forklist; //.data.Name.value

    @track i = 0;

    @track forks = [];

    /*get forklist() {
        return this._forklist;
    }
    set forklist(value) {
        this._forklist = value;
    }*/
    
    @track value = '01T1T000001UP21AAA';

    get optionsForks() {

        /*let x =1;
        const forks=[];
        for (let index = 0; index < forklist.length; index++) {
            forks.push({ label: x, value: x },);
            x += 1;
            
        }
        return forks;*/

        for (const iterator of this.forklist.data) {
            
            this.forks.push({ label: this.forklist.data[this.i].Name, value: this.forklist.data[this.i].Id });

            this.i++;

        }
/*
        for (let index = 0; index < 5; index++) {

            forks.push({ label: +'"'+ forklist[index] +'"' , value: '2' },);
            
        }*/

        this.i = 0;

        return this.forks;

/*
        return [
            { label: 'RockShox Judy Silver TK Solo Air Boost 27.5" Suspension Fork', value: 'FO-00027' },
            { label: 'Fox Racing Shox 36 Float 27.5" FIT GRIP2 Factory Boost Suspension Fork', value: 'FO-00028' },
            { label: '3T Rigid Team Carbon 29" Fork', value: 'FO-00029' },
            { label: 'Fox Racing Shox 34 Float SC 29 "120 FIT4 Factory 51 OffSet Boost Suspension Fork', value: 'FO-00083' },
            { label: 'RockShox BoXXer RC DebonAir Boost 29" Suspension Fork', value: 'FO-00087' },
        ];
        */


    }

    handleChange(event) {
        this.value = event.detail.value;
    }

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

        /*alert(this.product.data.fields.Battery__c.value);
          if(this.product.data.fields.Battery__c.value == null){

            this.product.data.fields.Battery__c.value = "Not Applicable";

            //alert(this.product.data.fields.Battery__c.value);
            //alert(product.data.fields.Battery__c.value);
        }*/

    }

    handleNavigateToRecord() {

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.product.data.fields.	Product_ID__c.value,
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

    handleClick2(){
        window.location.replace("https://tekkon-wheels-dev-ed.lightning.force.com/lightning/o/Opportunity/list?filterName=Recent");

    }

        

    navigateToNewRecordPage() {

        // Opens the new Account record modal
        // to create an Account.
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            }
        });
        
    }

    navigateToNewRecordPageCustomize() {

        if(this.product.data.fields.Modelo_Componente__c.value === 'Model'){

        // Opens the new Account record modal
        // to create an Account.
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Product2',
                actionName: 'new'
            }
        });

    }else{

        alert('Este produto não é customizável!');

    }

    }

    @track openmodel = false;
    openmodal() {

        if(this.product.data.fields.Modelo_Componente__c.value === 'Model'){

            this.openmodel = true

        }else{

            alert('Este produto não é customizável!');

        }


        
    }
    closeModal() {
        this.openmodel = false
    } 
    saveMethod() {
        alert('save method invoked');
        this.closeModal();
    }

    addProduct() {
        alert("This product has been customized successfully!");
        this.closeModal();
    }   

}

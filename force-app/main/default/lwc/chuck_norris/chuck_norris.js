import { LightningElement, track } from 'lwc';
import logo from '@salesforce/resourceUrl/ChuckNorrisLogo';

import fetchCategories from '@salesforce/apex/ChuckNorrisController.fetchCategories';
import fetchJokes from '@salesforce/apex/ChuckNorrisController.fetchJokes';

export default class Chuck_norris extends LightningElement {
    @track catOptions;
    @track selectedCate = '';
    @track joke = 'Why so serious...... :) Wait... Something is coming...';
    @track logo;

    handleCategoryChange(event){
        this.selectedCate = event.target.value;
        this.giveMeOneMore();
    }

    giveMeOneMore(){
        this.joke = 'Why so serious...... :) Wait... Something is coming...';

        fetchJokes({category : this.selectedCate })
        .then((result)=>{
            this.joke = result;
        })
        .catch((error)=>{
            console.log('Error: '+ (error.message || error.body.message) );
        })
    }


    connectedCallback(){
        this.catOptions = [];
        this.selectedCate = '';
        this.logo = logo;

        fetchCategories()
        .then((result)=>{
            let cats = [];
            cats.push( { label: 'Give Me All :)' , value: '' } );

            for( let i = 0 ; i < result.length ; i++ ){
                cats.push( { label:  result[i].charAt(0).toUpperCase() + result[i].slice(1) , value:result[i] } );
            }
            this.catOptions = cats;

            this.giveMeOneMore();
        })
        .catch((error)=>{
            console.log('Error: '+ (error.message || error.body.message) );
        })
    }
}
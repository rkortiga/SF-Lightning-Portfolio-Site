import { LightningElement } from 'lwc';
import createLead from '@salesforce/apex/ContactMeController.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactMeButton extends LightningElement {

    dialog;
    firstname;
    lastname;
    company;
    email;
    description;

    renderedCallback() {
        this.dialog = this.template.querySelector('.contact-dialog');
        this.firstname = this.template.querySelector('.firstname');
        this.lastname = this.template.querySelector('.lastname');
        this.company = this.template.querySelector('.company');
        this.email = this.template.querySelector('.email');
        this.description = this.template.querySelector('.description');
    }

    showDialog() {
        this.dialog.showModal();
    }

    closeDialog() {
        this.dialog.close();
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const firstnameValue = this.firstname.value;
        const lastnameValue = this.lastname.value;
        const companyValue = this.company.value;
        const emailValue = this.email.value;
        const descriptionValue = this.description.value;
    
        createLead({
            firstname: firstnameValue,
            lastname: lastnameValue,
            company: companyValue,
            email: emailValue,
            description: descriptionValue
        })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Your request has been received.',
                    variant: 'success',
                })
            );
        })
        .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Unable to accept contact request.',
                    variant: 'error',
                })
            );
            console.error(JSON.stringify(error));
        });
    
        this.closeDialog();
    }

    // New function to handle button hover
    handleMouseOver(event) {

        const button = this.template.querySelector('.launch-button');
        button.classList.add('hovered');
    }
}

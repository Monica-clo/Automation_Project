import {chromium, Page } from 'playwright';
import { LoginElements } from './LoginElements';
import { LoginData } from './LoginData';


export class LoginPage {
    elements: LoginElements;

    constructor(private page: Page) {
        this.elements = new LoginElements();
    }

    async navigateToLoginPage() {
        await this.page.goto(LoginData.logininlink);
        await this.page.click(this.elements.loginButton);
    }

    async login(email: string, password: string) {
        await this.page.fill(this.elements.emailInput, email);
        await this.page.fill(this.elements.passwordInput, password);
        await this.page.click(this.elements.submitLoginButton);
        
    }

    async getErrorMessage() {
        return await this.page.textContent(this.elements.errorMessage);
    }
    async goToProducts() {
        await this.page.click(this.elements.Products);
        await this.page.waitForSelector(this.elements.productListing); 
    }

    async searchAndAddToCart(productName: string) {
        // Search for the product
        await this.page.fill(this.elements.searchproduct, productName);
        await this.page.click(this.elements.searchproduct); 
        await this.page.waitForSelector(this.elements.searchproduct); 
        await this.page.click(this.elements.Viewproduct);
        await this.page.click(this.elements.tshirtaddtocart);
        await this.page.waitForTimeout(500);
        await this.page.click(this.elements.continueshopping);
        await this.page.click(this.elements.Products);
        
    }
    async gotoHome() {
        await this.page.click(this.elements.home);
        await this.page.waitForSelector(this.elements.homeListing);
        await this.page.click(this.elements.women);
        await this.page.click(this.elements.dress);
        await this.page.click(this.elements.dress1);
        await this.page.click(this.elements.dressaddtocart);

    }

    async goandreview(reviewname: string, reviewemail: string, reviewsubject: string, reviewmessage:string , adddoc:string, submitreview:string){
        await this.page.click(this.elements.contactus);
        await this.page.fill(this.elements.reviewname,reviewname);
        await this.page.fill(this.elements.reviewemail,reviewemail);
        await this.page.fill(this.elements.reviewsubject,reviewsubject);
        await this.page.fill(this.elements.reviewmessage,reviewmessage);
        const fileInputSelector = this.elements.adddoc; // Assuming this is the selector for the file input field
        await this.page.setInputFiles(fileInputSelector, adddoc); // Provide the file path from the spec file
        await this.page.click(this.elements.submitreview);

    }

}
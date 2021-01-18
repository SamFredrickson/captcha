import {Event} from "./event.js";

export class Captcha
{
    // Initialization of form id, classame, tag in local space.
    constructor(form)
    {
        this.form = form;
        this.captcha_element = ".captcha__row div";
        this.validation_pattern = "123456789";
    }

    GetSelectorType()
    {
        switch( this.form.substr(0, 1) ){
            case '.' : return 'class'; break;
            case '#' : return 'id';    break; 
            default  : return 'tag';   break;
        }
    }

    init()
    {
        // Inserting images randomly
        document.addEventListener("DOMContentLoaded", this.shuffle);
        // Creating events for dragging.
        new Event('dragstart', e => this.dragStart(e), this.captcha_element, 'class');
        new Event('dragend', e => this.dragEnd(e), this.captcha_element, 'class');
        new Event('dragover', e => this.dragOver(e), this.captcha_element, 'class');
        new Event('drop', e => this.dragDrop(e), this.captcha_element, 'class');

        new Event('submit', e => this.validate(e), this.form, this.GetSelectorType(this.form));
    }

    shuffle()
    {
        const nums = new Set();
        while(nums.size !== 9) 
            nums.add(Math.floor(Math.random() * 9) + 1);

        let numbers = Array.from(nums);
        let pattern = '';
        let to = 3;
        let from = 0;
        const captchaContent = document.querySelector(".captcha__content");

        for(let i = 0; i < 3; i++){
            pattern += `<div class="captcha__row">`;
            for(let j = from; j < to; j++){
                pattern += `<div>
                        <img draggable="true" src="images/${numbers[j]}.jpg">
                    </div>`;
            }
            pattern += `</div>`;

            from += 3; to += 3;
        }

        captchaContent.innerHTML = pattern;
        
    }

    dragStart(e)
    {
      this.start = e.target
      e.target.classList.add("hold");
    }

    dragEnd(e)
    {
       this.end = e.target;
       e.target.classList.remove("hold");
    }

    dragOver(e){
        e.preventDefault();
    }

    dragDrop(e){
        this.drop = e.target.src;
        e.target.src = this.start.src;
        this.start.src = this.drop;
    }

    validate(e)
    {
    	e.preventDefault();
    	console.log(e.target);
    }

}

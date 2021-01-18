export class Event
{
   constructor(event, func, object, selectorType){
        this.event = event;
        this.func = func;
        this.object = object;
        this.selectorType = selectorType;

        switch(this.selectorType){
            case 'class': this.HookOnClass(); break;
            case 'id'   : this.HookOnId(); break;
            case 'tag'  : this.HookOnTag(); break;
        }

   }

   HookOnClass()
   {
        document.addEventListener("DOMContentLoaded", () => {
            const obj = document.querySelectorAll(this.object);
            
            obj.forEach(o => {
                o.addEventListener(this.event, this.func);
            })
        })
   }

   HookOnTag()
   {
        document.addEventListener("DOMContentLoaded", () => {
            const obj = document.querySelectorAll(this.object);
            
            obj.forEach(o => {
                o.addEventListener(this.event, this.func);
            })
        })
   }

   HookOnId()
   {
        document.addEventListener("DOMContentLoaded", () => {
            const obj = document.querySelector(this.object);
            obj.addEventListener(this.event, this.func);
        })
   }
}
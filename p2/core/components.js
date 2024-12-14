export class BaseComponent {
    
    constructor(attrs = [], classes = []) {
        this.attrs = attrs
        this.classes = classes
    }

    #renderAttributes() {
        this.attrs.map()
    }
}
class Decorator implements Component {
    
    private component: any;

    constructor(component: any) {
        this.component = component;
        this.up();        
    }


    up() {

        this.component.up();

        // for ajax calls etc
    }

    down() {
        this.component.down();
    }


    updated() {
    }

    render() {
        // to render stiff
    }

}
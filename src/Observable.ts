import { Evt } from "./Event";
import { Observer } from "./Observer";


class Observable {

    private observerCollection: Observer[] = []; 

    
    public registerObserver(obs: Observer) {
        this.observerCollection.push(obs);
    };

    public unregisterObserver(obs: Observer) {
        const index = this.observerCollection.indexOf(obs);
        if(index > -1) {
            this.observerCollection.splice(index, 1);
        }
        throw new Error("No obs was found");
    };

    public notifyObservers(arg: Evt) {
        for (const observer of this.observerCollection) {
            observer.update(arg);
            console.log("Notified");    
        }
    }

}

export {Observable};
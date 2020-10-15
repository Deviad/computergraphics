import { Evt } from "./Event";


interface Observer {
    update(event: Evt): void;
}

export {Observer};
class Evt {
    id: EvtType;
}

enum EvtType {
    MOUNTED = "MOUNTED",
    UNMOUNTED = "UNMOUNTED",
    UPDATED = "UPDATED", 
}

export {Evt, EvtType};
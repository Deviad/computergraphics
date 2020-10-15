// this is for compliance with code style rules,
// blocking you from using console.log since errors
// should be actually handled.
// In companies oftentimes Sentry or rest calls to an endpoint
// logging errors are used.

const log = (args: any) => {
    // this avoids name shadowing
    const {log: logAlias} = console;
    return logAlias(args);
}


const info = (args: any) => {
    // this avoids name shadowing
    const {info: logInfo} = console;
    return logInfo(args);
}


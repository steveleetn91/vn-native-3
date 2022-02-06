export default interface ElectronInterfaceHelper {
    checkFlagBuild(callback : Function) : Function | void
    cli(type : string) : void
    makeShortcut() : void
}
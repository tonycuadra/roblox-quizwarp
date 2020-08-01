import { Closeable } from "shared/Closeable";

/**
 * Base class for Instance controllers.
 * 
 * It keeps a readonly reference to the Instance and tracks added script
 * connections so they can all be disconnected when close is called.
 */
export class BaseController<T extends Instance> implements Closeable {

    readonly instance: T;
    protected connections: RBXScriptConnection[] = [];

    constructor(instance: T) {
        this.instance = instance;
    }

    addConnection(connection: RBXScriptConnection) {
        this.connections.push(connection);
    }

    close() {
        for (const connection of this.connections) {
            connection.Disconnect();
        }
        this.connections = [];
    }
}

import { Closeable } from "./Closeable";
import { CollectionService } from '@rbxts/services';

export class TaggedCollection<T extends Closeable> {

    private controllerMap: Map<Instance, T> = new Map();
    private controllerFactory: (instance: Instance) => T;

    constructor(tagName: string, controllerFactory: (instance: Instance) => T) {
        this.controllerFactory = controllerFactory;

        print(`Creating TaggedCollection: ${tagName}`)

        const addedSignal = CollectionService.GetInstanceAddedSignal(tagName);
        const removedSignal = CollectionService.GetInstanceRemovedSignal(tagName);

        addedSignal.Connect(instance => this.onAdded(instance));
        removedSignal.Connect(instance => this.onRemoved(instance));

        for (const instance of CollectionService.GetTagged(tagName)) {
            this.onAdded(instance);
        }
    }

    getController(instance: Instance): T | undefined {
        return this.controllerMap.get(instance);
    }

    getControllers(): T[] {
        return this.controllerMap.values();
    }

    onAdded(instance: Instance) {
        const controller = this.createController(instance);
        this.controllerMap.set(instance, controller);
    }

    onRemoved(instance: Instance) {
        const controller = this.controllerMap.get(instance);
        this.controllerMap.delete(instance);
        this.destroyController(controller);
    }

    private createController(instance: Instance): T {
        return this.controllerFactory(instance);
    }

    private destroyController(controller: T | undefined) {
        if (controller !== undefined) {
            controller.close();
        }
    }
}

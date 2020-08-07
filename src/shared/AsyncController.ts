import { yieldForTree, InstanceTree } from "@rbxts/validate-tree";
import { BaseController } from "./BaseController";

export class AsyncController<T extends Instance> extends BaseController<T> {

    private fullTreeReady = false;
    private onFullTreeReadyCalled = false;
    private instanceTree: InstanceTree;

    constructor(instance: T, instanceTree: InstanceTree) {
        super(instance);
        this.instanceTree = instanceTree;
        this.waitForFullTree();
    }

    async waitForFullTree() {
        if (this.fullTreeReady) {
            return;
        }
        await yieldForTree(this.instance, this.instanceTree);
        this.fullTreeReady = true;

        if (!this.onFullTreeReadyCalled) {
            this.onFullTreeReady();
            this.onFullTreeReadyCalled = true;
        }
    }

    /**
     * Override to perform initialization that requires the full object tree.
     */
    onFullTreeReady() {}
}

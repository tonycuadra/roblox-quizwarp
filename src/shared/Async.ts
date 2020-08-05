export async function RunAsync<T>(yieldingFunction: () => T) {
    return new Promise<T>(resolve => {
        Promise.spawn(() => {
            const result = yieldingFunction();
            resolve(result);
        });
    });
}

export async function OpcallAsync<T>(yieldingFunction: () => T) {
    return new Promise<T>((resolve, reject) => {
        Promise.spawn(() => {
            const result = opcall(yieldingFunction);
            if (result.success) {
                resolve(result.value);
            } else {
                reject(result.error);
            }
        });
    });
}

export async function WaitForChildAsync(parent: Instance, name: string) {
    return RunAsync(() => parent.WaitForChild(name))
}

export async function WaitAsync(seconds: number) {
    return RunAsync(() => wait(seconds));
}

export async function GetDataAsync<T>(dataStore: GlobalDataStore, key: string) {
    return OpcallAsync(() => dataStore.GetAsync<T>(key));
}

export async function SetDataAsync<T>(dataStore: GlobalDataStore, key: string, value: T) {
    return OpcallAsync(() => dataStore.SetAsync(key, value));
}

export async function WaitForSignalAsync(signal: RBXScriptSignal): Promise<LuaTuple<any[]>> {
    return RunAsync(() => signal.Wait());
}

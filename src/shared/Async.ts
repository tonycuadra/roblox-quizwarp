export async function AsyncChildOf(parent: Instance, name: string): Promise<Instance> {
    return new Promise(resolve => {
        Promise.spawn(() => {
            const child = parent.WaitForChild(name);
            resolve(child);
        });
    });
}

export async function AsyncWait(seconds: number): Promise<LuaTuple<[number, number]>> {
    return new Promise<LuaTuple<[number, number]>>(resolve => {
        Promise.spawn(() => resolve(wait(seconds)));
    });
}

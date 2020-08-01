export function newFolder(name: string, parent?: Instance): Folder {
    const folder = new Instance('Folder', parent);
    folder.Name = name;
    return folder;
}

export function newBoolValue(name: string, value: boolean, parent?: Instance): BoolValue {
    const instance = new Instance('BoolValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newBrickColorValue(name: string, value: BrickColor, parent?: Instance): BrickColorValue {
    const instance = new Instance('BrickColorValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newCFrameValue(name: string, value: CFrame, parent?: Instance): CFrameValue {
    const instance = new Instance('CFrameValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newColor3Value(name: string, value: Color3, parent?: Instance): Color3Value {
    const instance = new Instance('Color3Value', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

// TODO: Look into range issues with 64-bit int stored as floating-point number
export function newIntValue(name: string, value: number, parent?: Instance): IntValue {
    const instance = new Instance('IntValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newNumberValue(name: string, value: number, parent?: Instance): NumberValue {
    const instance = new Instance('NumberValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newObjectValue(name: string, value: Instance, parent?: Instance): ObjectValue {
    const instance = new Instance('ObjectValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newRayValue(name: string, value: Ray, parent?: Instance): RayValue {
    const instance = new Instance('RayValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newStringValue(name: string, value: string, parent?: Instance): StringValue {
    const instance = new Instance('StringValue', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

export function newVector3Value(name: string, value: Vector3, parent?: Instance): Vector3Value {
    const instance = new Instance('Vector3Value', parent);
    instance.Name = name;
    instance.Value = value;
    return instance;
}

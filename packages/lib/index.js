export const devices = [];
export function getDeviceInfoByIdentifier(identifier) {
    return devices.find(d => d.model === identifier);
}
export function getDeviceNameFromIdentifier(identifier) {
    const device = getDeviceInfoByIdentifier(identifier);
    if (device) {
        return device.name;
    }
    return identifier;
}

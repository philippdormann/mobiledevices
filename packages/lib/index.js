export const devices = [];
export function getDeviceInfoByIdentifier(identifier) {
    return devices.find(d => `${d.model}`.toUpperCase() === identifier.toUpperCase());
}
export function getDeviceNameFromIdentifier(identifier) {
    const device = getDeviceInfoByIdentifier(identifier);
    if (device) {
        return device.name;
    }
    return identifier;
}

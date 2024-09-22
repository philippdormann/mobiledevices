import { getDeviceNameByIdentifier } from "@philippdormann/appledevices"
import { getDevicesByModel } from "android-device-list";
// 
export function getDeviceInfoByIdentifier(identifier) {
    let device = undefined;
    const androidDevices = getDevicesByModel(identifier);
    if (androidDevices) {
        if (androidDevices.length === 1) {
            device = androidDevices[0];
        }
    }
    if (device === undefined) {
        const appleInfo = getDeviceNameByIdentifier(identifier);
        if (appleInfo) {
            device = { brand: "Apple", name: appleInfo, device: appleInfo, model: identifier };
        }
    }
    return device;
}
export function getDeviceNameFromIdentifier(identifier) {
    const device = getDeviceInfoByIdentifier(identifier);
    if (device) {
        return device.name;
    }
    return identifier;
}

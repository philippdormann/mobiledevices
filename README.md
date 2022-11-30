# @philippdormann/mobiledevices
npm package for parsing mobile device code names to readable device infos

## Library Usage
### Install
```
pnpm i @philippdormann/mobiledevices
```
## Usage
```
import { getDeviceInfoByIdentifier } from "@philippdormann/mobiledevices"

console.log(getDeviceInfoByIdentifier("iPhone15,3"));
console.log(getDeviceInfoByIdentifier("LG-H815"));
console.log(getDeviceInfoByIdentifier("GM1913"));
console.log(getDeviceInfoByIdentifier("iPhone11,8"));
```
## Result
```
{ brand: 'Apple', name: 'iPhone 14 Pro Max', device: 'iPhone 14 Pro Max', model: 'iPhone15,3' }
{ brand: 'LGE', name: 'LG G4', device: 'p1', model: 'LG-H815' }
{ brand: 'OnePlus', name: 'OnePlus 7 Pro', device: 'OnePlus7Pro', model: 'GM1913' }
{ brand: 'Apple', name: 'iPhone XR', device: 'iPhone XR', model: 'iPhone11,8' }
```
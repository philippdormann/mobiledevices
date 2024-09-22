import got from 'got';
import fs from 'fs';
import Papa from 'papaparse';
// 
got.get('https://storage.googleapis.com/play_public/supported_devices.csv').text().then((res) => {
    let result = Papa.parse(res, { skipEmptyLines: true }).data
    const alldevices = []
    result.shift()
    result.forEach(d => {
        const brand=(d[0] || "").replaceAll("\x00", "").replaceAll("\n", "");
        let name=(d[1] || "").replaceAll("\x00", "").replaceAll("\n", "");
        if(name.startsWith(`${brand} `)){
            name=name.replace(`${brand} `,"")
        }
        const device=(d[2] || "").replaceAll("\x00", "").replaceAll("\n", "");
        const model=(d[3] || "").replaceAll("\x00", "").replaceAll("\n", "");
        alldevices.push({ brand, name, device, model })
    });
    got.get('https://gist.githubusercontent.com/adamawolf/3048717/raw/bd838e3254565a8da730873667e5d39902fffe6e/Apple_mobile_device_types.txt').text().then((res) => {
        res = res.replaceAll("\n\n", "\n");
        const devices = res.split("\n");
        devices.forEach(d => {
            const info = d.split(" : ");
            const brand="Apple"
            let name=info[1]
            if(name.startsWith(`${brand} `)){
                name=name.replace(`${brand} `,"")
            }
            let device=info[0]
            let model=info[0]
            alldevices.push({ brand, name, device, model })
        });
        let filecontent = fs.readFileSync("./packages/lib/index.js", { encoding: "utf8" });
        filecontent = filecontent.replace("export const devices = [];", `export const devices = ${JSON.stringify(alldevices)};`)
        fs.writeFileSync("./packages/lib/index.js", filecontent);
    })
})


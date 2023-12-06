import { readFile, readdir } from 'fs/promises';
import { dirname, resolve } from 'path';
import { InputPluginOption } from 'rollup';
import yaml from 'js-yaml';

interface Options {
    dir?: string;
}

export default function yamlTransformer(options: Options = {}): InputPluginOption {
    return {
        name: 'yaml-transformer',
        version: '1.0.0',
        async buildStart(opt) {
            let dir: string;
            if(options.dir) {
                dir = resolve(process.cwd(), options.dir);
            } else {
                dir = resolve(process.cwd(), './src/locales');
            }
            const files = await readdir(dir);
            for(const file of files) {
                const filePath = resolve(dir, file);
                const content = await readFile(filePath, 'utf-8');
                const parsed = yaml.load(content);
                const jsonStr = JSON.stringify(parsed);
                this.emitFile({
                    type: 'asset',
                    fileName: 'locales/' + file.replace(/\.ya?ml$/, '.json'),
                    source: jsonStr,
                });
            }
        },
    };
}

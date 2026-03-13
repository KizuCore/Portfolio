import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const LOCALE_DIR = path.join(SRC_DIR, "locale");
const LOCALES = ["fr", "en", "es", "bzh"];
const BASE_LOCALE = "fr";
const CODE_FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);

function parseArgs(argv) {
    const hasFlag = (name) => argv.includes(name);
    const fillArg = argv.find((arg) => arg.startsWith("--fill="));
    const fillMode = fillArg ? fillArg.split("=")[1] : "base";

    if (!["base", "key", "empty"].includes(fillMode)) {
        throw new Error("Invalid --fill value. Use one of: base, key, empty.");
    }

    return {
        write: hasFlag("--write"),
        fillMode,
    };
}

async function listCodeFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const absPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === "locale" || entry.name === "assets") {
                continue;
            }
            files.push(...(await listCodeFiles(absPath)));
            continue;
        }

        const ext = path.extname(entry.name);
        if (CODE_FILE_EXTENSIONS.has(ext)) {
            files.push(absPath);
        }
    }

    return files;
}

function extractTranslationKeys(sourceCode) {
    const keys = new Set();
    const regex = /\b(?:t|tx)\(\s*(["'`])([^"'`]+?)\1/g;

    let match;
    while ((match = regex.exec(sourceCode)) !== null) {
        const key = match[2]?.trim();
        if (!key || key.includes("${")) {
            continue;
        }
        keys.add(key);
    }

    return keys;
}

function flattenObject(obj, parentKey = "") {
    const out = {};

    for (const [key, value] of Object.entries(obj)) {
        const nextKey = parentKey ? `${parentKey}.${key}` : key;
        if (value && typeof value === "object" && !Array.isArray(value)) {
            Object.assign(out, flattenObject(value, nextKey));
        } else {
            out[nextKey] = value;
        }
    }

    return out;
}

function setDeep(target, keyPath, value) {
    const parts = keyPath.split(".");
    let current = target;

    for (let i = 0; i < parts.length - 1; i += 1) {
        const part = parts[i];
        if (!(part in current) || typeof current[part] !== "object" || current[part] === null) {
            current[part] = {};
        }
        current = current[part];
    }

    current[parts[parts.length - 1]] = value;
}

function humanizeKey(key) {
    return key
        .split(".")
        .pop()
        ?.replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim() || key;
}

function getFillValue({ locale, key, baseValues, fillMode }) {
    if (fillMode === "empty") return "";
    if (fillMode === "key") return humanizeKey(key);

    if (locale === BASE_LOCALE) {
        return humanizeKey(key);
    }

    return key in baseValues ? baseValues[key] : humanizeKey(key);
}

async function readLocaleJson(locale) {
    const filePath = path.join(LOCALE_DIR, `${locale}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    return {
        filePath,
        data: JSON.parse(raw),
    };
}

async function main() {
    const args = parseArgs(process.argv.slice(2));

    const codeFiles = await listCodeFiles(SRC_DIR);
    const codeKeys = new Set();

    await Promise.all(
        codeFiles.map(async (filePath) => {
            const content = await fs.readFile(filePath, "utf8");
            for (const key of extractTranslationKeys(content)) {
                codeKeys.add(key);
            }
        })
    );

    const locales = {};
    for (const locale of LOCALES) {
        locales[locale] = await readLocaleJson(locale);
    }

    const baseFlat = flattenObject(locales[BASE_LOCALE].data);
    const targetKeys = new Set([...Object.keys(baseFlat), ...codeKeys]);

    const missingByLocale = {};
    let totalMissing = 0;

    for (const locale of LOCALES) {
        const flat = flattenObject(locales[locale].data);
        const missing = [...targetKeys].filter((key) => !(key in flat));
        missingByLocale[locale] = missing;
        totalMissing += missing.length;
    }

    if (args.write && totalMissing > 0) {
        for (const locale of LOCALES) {
            const missing = missingByLocale[locale];
            if (missing.length === 0) continue;

            const localeData = locales[locale].data;
            for (const key of missing) {
                const value = getFillValue({
                    locale,
                    key,
                    baseValues: baseFlat,
                    fillMode: args.fillMode,
                });
                setDeep(localeData, key, value);
            }

            await fs.writeFile(locales[locale].filePath, `${JSON.stringify(localeData, null, 4)}\n`, "utf8");
        }
    }

    console.log(`Scanned files: ${codeFiles.length}`);
    console.log(`Detected i18n keys in code: ${codeKeys.size}`);

    for (const locale of LOCALES) {
        const missing = missingByLocale[locale];
        if (missing.length === 0) {
            console.log(`- ${locale}: OK`);
        } else {
            console.log(`- ${locale}: ${missing.length} missing key(s)`);
            for (const key of missing.slice(0, 20)) {
                console.log(`  - ${key}`);
            }
            if (missing.length > 20) {
                console.log(`  ... and ${missing.length - 20} more`);
            }
        }
    }

    if (totalMissing > 0 && !args.write) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});

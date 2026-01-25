import {genJavaRecordsFromHonoTypes} from "./generate-java-records";
import {generateSharedConsts} from "./generate-shared-consts";

const javaPackage = `dev.svenehrke.springboothonopoc.core`;
const outPath = `build/generated-sources/java-dtos/src/main/java/${javaPackage.split(".").join("/")}`;

genJavaRecordsFromHonoTypes({
	tsConfigPath: 'tsconfig.json',
	inputGlob: 'src/app/**/*-vm.ts',
	outputDir: outPath,
	javaPackage: javaPackage,
});
// console.log('')
generateSharedConsts({
	tsConfigPath: 'tsconfig.json',
	inputGlob: 'src/app/**/*shared-consts.ts',
	outputDir: outPath,
	javaPackage: javaPackage,
});



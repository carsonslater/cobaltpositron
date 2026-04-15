#!/usr/bin/env node
// Builds a .vsix package without needing @vscode/vsce
// A .vsix is a zip file with a specific structure

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = pkg.version;
const name = pkg.name;
const publisher = pkg.publisher;
const vsixName = `${name}-${version}.vsix`;

// Files to include in the extension
const files = [
  'package.json',
  'CHANGELOG.md',
  'README.md',
  'LICENSE.txt',
  'icon.png',
  'themes/CobaltPositron-Theme-color-theme.json',
  'media/latex-dark.css'
];

// Create a temp directory for the vsix structure
const tmpDir = path.join(__dirname, '.vsix-build');
const extDir = path.join(tmpDir, 'extension');

// Clean up any previous build
if (fs.existsSync(tmpDir)) {
  execSync(`rm -rf "${tmpDir}"`);
}

fs.mkdirSync(extDir, { recursive: true });

// Copy extension files
for (const file of files) {
  const src = path.join(__dirname, file);
  const dest = path.join(extDir, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// Create [Content_Types].xml
const contentTypes = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".md" ContentType="text/markdown"/>
  <Default Extension=".txt" ContentType="text/plain"/>
  <Default Extension=".png" ContentType="image/png"/>
  <Default Extension=".css" ContentType="text/css"/>
  <Default Extension=".vsixmanifest" ContentType="text/xml"/>
</Types>`;
fs.writeFileSync(path.join(tmpDir, '[Content_Types].xml'), contentTypes);

// Create extension.vsixmanifest
const manifest = `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
  <Metadata>
    <Identity Language="en-US" Id="${name}" Version="${version}" Publisher="${publisher}"/>
    <DisplayName>${pkg.displayName}</DisplayName>
    <Description xml:space="preserve">${pkg.description}</Description>
    <Tags>theme</Tags>
    <Categories>Themes</Categories>
    <GalleryFlags>Public</GalleryFlags>
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="${pkg.engines.vscode}"/>
      <Property Id="Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown" Value="true"/>
    </Properties>
    <Icon>extension/icon.png</Icon>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Dependencies/>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/CHANGELOG.md" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE.txt" Addressable="true"/>
    <Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true"/>
  </Assets>
</PackageManifest>`;
fs.writeFileSync(path.join(tmpDir, 'extension.vsixmanifest'), manifest);

// Create the .vsix (zip)
const outPath = path.join(__dirname, vsixName);
if (fs.existsSync(outPath)) {
  fs.unlinkSync(outPath);
}
execSync(`cd "${tmpDir}" && zip -r "${outPath}" . -x ".*"`, { stdio: 'inherit' });

// Clean up
execSync(`rm -rf "${tmpDir}"`);

console.log(`\nCreated: ${vsixName}`);

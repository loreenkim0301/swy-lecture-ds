#!/usr/bin/env node
/*
 * 의존성 없는 초간단 빌드 스크립트.
 * src/index.css의 @import 체인을 순서대로 이어붙여 dist/에 단일 CSS로 만든다.
 * 무거운 번들러를 쓰지 않는 이유: 이 라이브러리 자체가 "빌드 도구 없이 바로 쓰는" 것을
 * 철학으로 삼기 때문에, 라이브러리를 만드는 쪽 빌드도 최대한 투명하고 가볍게 유지한다.
 */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const ORDER = ['tokens.css', 'base.css', 'layout.css', 'components.css'];

function readSrc(name) {
  return fs.readFileSync(path.join(SRC_DIR, name), 'utf8').replace(/@import\s+["'][^"']+["'];\s*\n?/g, '');
}

function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

const banner = `/*! swy-lecture-ds v${require('./package.json').version} | MIT License | https://github.com/loreenkim0301/swy-lecture-ds */\n`;
const combined = ORDER.map(readSrc).join('\n');

fs.writeFileSync(path.join(DIST_DIR, 'swy-lecture-ds.css'), banner + combined);
fs.writeFileSync(path.join(DIST_DIR, 'swy-lecture-ds.min.css'), banner + minify(combined));
fs.copyFileSync(path.join(__dirname, 'js', 'sw-ds.js'), path.join(DIST_DIR, 'sw-ds.js'));

console.log('build ok -> dist/swy-lecture-ds.css, dist/swy-lecture-ds.min.css, dist/sw-ds.js');

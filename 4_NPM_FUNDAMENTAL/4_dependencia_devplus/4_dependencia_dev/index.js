import _ from 'lodash';
import chalk from 'chalk'; 
// mudar ou adicionar no packge.json "type": "module"  | forma import <nome> from '<nome>' exemplo link abaixo
// https://www.udemy.com/course/nodejs-do-zero-a-maestria-com-diversos-projetos/learn/lecture/28332828#questions/19719212

const a = [1, 2, 3, 4, 5];
const b = [2, 4, 6, 7, 8];

const diff = _.difference(a, b);

console.log(chalk.red.bold(diff));

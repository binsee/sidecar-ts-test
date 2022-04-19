/*
 * @Author       : binsee
 * @Date         : 2022-04-15 13:37:19
 * @LastEditTime : 2022-04-19 15:44:49
 * @LastEditors  : binsee
 * @Description  :
 */

import { name } from './config'
/// <reference path="./mod.d.ts" />

export const sayCallback = new NativeCallback(() => {}, 'void', ['int', 'pointer'])
const sayFunction = new NativeFunction(sayCallback, 'void', ['int', 'pointer'])

export const getName = () => name

export const output = (str: string) => {
  console.log('output() arg:', str)

  const text = `${name} say: ${str}`
  sayFunction(Date.now(), Memory.allocUtf8String(text))
}

export const error = () => {
  console.log('call error() ...')
  try {
    throw new Error('test error')
  } catch (error) {
    const err = error as Error
    console.log('error():', err.message, err.stack)
  }
}

console.log('Frida.version:', Frida.version)
console.log('Script.runtime:', Script.runtime)
console.log(`Hello ${getName()}!`)

setTimeout(() => {
  console.log('\n---------------')
  if (global.demo) {
    console.log('namespace (global.demo) exist! type:', typeof global.demo,', global:', JSON.stringify(global.demo),'\n')
    console.log('Sidecar can find `demo.error()` and call it.')
  } else {
    console.error('namespace (global.demo) not exist!')
    console.log('Sidecar can\'t find `error()`, because it\'s inside an anonymous function.')
  }
  console.log('---------------\n')
},1000)

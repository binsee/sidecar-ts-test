/*
 * @Author       : binsee
 * @Date         : 2022-04-15 13:45:20
 * @LastEditTime : 2022-04-15 15:12:13
 * @LastEditors  : binsee
 * @Description  :
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { agentTarget, Call, Hook, ParamType, Ret, Sidecar, SidecarBody } from 'sidecar'

import { codeRoot } from '../cjs.js'
import { targetName } from '../config.js'

const initAgentScript = readFileSync(join(codeRoot, 'src', 'init-agent-script.js'), 'utf-8')

@Sidecar(targetName, initAgentScript, 'demo')
export class DemoSidecar extends SidecarBody {
  @Call(agentTarget('output'))
  output(text: string): Promise<void> {
    return Ret(text)
  }

  @Call(agentTarget('getName'))
  getName(): Promise<string> {
    return Ret()
  }
  
  @Call(agentTarget('error'))
  error(): Promise<void> {
    return Ret()
  }

  @Hook(agentTarget('sayCallback'))
  sayCallback(
    @ParamType('int', 'Int') time: number,
    @ParamType('pointer', 'Utf8String') text: string
  ) {
    return Ret(text)
  }
}

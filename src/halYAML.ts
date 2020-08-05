import { DEFAULT_FULL_SCHEMA, Type } from 'js-yaml';
import * as yaml from 'js-yaml';

const jsFunctionType = (<any>yaml.DEFAULT_FULL_SCHEMA).compiledTypeMap.fallback['tag:yaml.org,2002:js/function'];
const halFnType = new Type('tag:yaml.org,2002:code', {
  kind: 'scalar',
  resolve: jsFunctionType.resolve,
  construct: jsFunctionType.construct,
  predicate: jsFunctionType.predicate,
  represent: jsFunctionType.represent
})

export const HAL_SCHEMA = new yaml.Schema({
  include: [DEFAULT_FULL_SCHEMA],
  explicit: [halFnType]
});

export function load(str: string) {
  return yaml.load(str, {schema: HAL_SCHEMA});
}

export function dump(obj: any) {
  return yaml.dump(obj, { schema: HAL_SCHEMA })
}

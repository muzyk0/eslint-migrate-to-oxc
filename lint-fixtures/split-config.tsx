import zeta from 'zeta';
import React from 'react';
import { forward } from 'effector';
import alpha from 'alpha';

type StateSetter<T> = (value: T) => void;

declare function useState<T>(value: T): [T, StateSetter<T>];
declare function useEffect(callback: () => void, deps: unknown[]): void;
declare const source: unknown;
declare const target: unknown;

const value = foo + 1;
const foo = 1;

enum Kind {
  A = 1,
  B = 1,
}

class Example {
  first() {}
  second() {}
}

export function HookFixture(props: { ready: boolean }) {
  const [count, setCount] = useState(0);

  if (props.ready) {
    useEffect(() => {
      setCount(1);
    }, []);
  }

  return (
    <div>
      <input autoFocus />
      <div tabIndex={1}>{count}</div>
    </div>
  );
}

forward({ from: source, to: target });

void React;
void zeta;
void alpha;
void value;
void foo;
void Example;
void Kind;
void HookFixture;

debugger;

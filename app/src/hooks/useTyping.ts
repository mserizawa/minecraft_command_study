import { useState, useEffect } from 'react';

type State = { displayed: string; done: boolean; id: string };

export function useTyping(text: string, id: string, speed = 48) {
  const [state, setState] = useState<State>({ displayed: '', done: false, id });

  useEffect(() => {
    setState({ displayed: '', done: false, id });
    if (!text) { setState({ displayed: '', done: true, id }); return; }

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setState({ displayed: text.slice(0, i), done: i >= text.length, id });
      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [id, text, speed]);

  // effectが走る前の1レンダーで古いidのstateが残っても空値を返す
  return {
    displayed: state.id === id ? state.displayed : '',
    done: state.id === id ? state.done : false,
  };
}

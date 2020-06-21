import {h, VNode} from 'preact';
import {useCallback, useState} from 'preact/hooks';
import {
  btn,
  btnDanger,
  btnLight,
  btnPrimary,
  dFlex,
  flexColumn,
  flexGrow1,
  flexRow,
  flexShrink0,
  flexWrap,
  flexXlNowrap,
  justifyContentCenter,
  justifyContentXlBetween,
  mb1,
  mr1,
  textRight
} from '~bootstrap';
import {Bait} from '../../data/bait';
import {Fish} from '../../data/fish';
import {FishLocation, LOCATION_LIST} from '../../data/fishLocation';
import {Hook} from '../../data/hooks';
import {useAppState} from '../../state';
import {newGame} from '../../state/action-creators/newGame';
import {submitTip} from '../../state/action-creators/submitTip';
import {iconRenderFn} from './iconRenderFn';
import {TipCard} from './TipCard';

export function TipDispatcher(): VNode {
  const [location, setLocation] = useState<null | FishLocation>(null);
  const [fish, setFish] = useState<Fish | null>(null);
  const [hook, setHook] = useState<Hook[]>([]);
  const [distance, setDistance] = useState<number[]>([]);
  const [bait, setBait] = useState<null | Bait>(null);

  const onResetClick = useCallback(() => {
    setLocation(null);
    setFish(null);
    setHook([]);
    setDistance([]);
    setBait(null);
  }, []);

  const [appState, dispatch] = useAppState();
  const onSave = useCallback(() => {
    const picked = Object.entries({location, fish, hook, distance, bait})
      .reduce<Obj<any>>(
        (acc, [key, value]) => {
          if (value) {
            if (Array.isArray(value)) {
              if (value.length) {
                acc[key] = value.length === 1 ? value[0] : value;
              }
            } else {
              acc[key] = value;
            }
          }

          return acc;
        },
        {}
      );

    dispatch(submitTip(picked));
    onResetClick();
  }, [location, fish, hook, distance, bait, dispatch, onResetClick]);
  const onNewGame = useCallback(() => {
    dispatch(newGame());
    onResetClick();
  }, [dispatch, onResetClick]);

  const topClass = [
    dFlex,
    flexRow,
    justifyContentXlBetween,
    justifyContentCenter,
    mb1,
    flexWrap,
    flexXlNowrap
  ].join(' ');

  return (
    <div class={`${dFlex} ${flexColumn}`}>
      <div class={topClass}>
        <TipCard options={LOCATION_LIST}
                 get={location}
                 set={setLocation}>Location</TipCard>
        <TipCard options={appState.availableFish}
                 render={iconRenderFn}
                 get={fish}
                 set={setFish}>Fish</TipCard>
        <TipCard options={appState.availableBait}
                 render={iconRenderFn}
                 get={bait}
                 set={setBait}>Bait</TipCard>
        <TipCard options={appState.availableHooks}
                 multi={true}
                 render={iconRenderFn}
                 get={hook}
                 set={setHook}>Hook</TipCard>
        <TipCard options={appState.availableDistance}
                 multi={true}
                 get={distance}
                 set={setDistance}>Distance</TipCard>
      </div>
      <div class={`${textRight} ${flexGrow1} ${flexShrink0}`}>
        <button type={'button'}
                onClick={onNewGame}
                class={`${btn} ${btnDanger} ${mr1}`}>New game
        </button>
        <button type={'button'}
                onClick={onResetClick}
                class={`${btn} ${btnLight} ${mr1}`}>Reset
        </button>
        <button type={'button'}
                onClick={onSave}
                class={`${btn} ${btnPrimary}`}>Submit tip
        </button>
      </div>
    </div>
  );
}

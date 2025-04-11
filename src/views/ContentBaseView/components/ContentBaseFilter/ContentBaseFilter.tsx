import { observer } from 'mobx-react-lite';
import { FilterComp } from '@components';
import { useStoresHook } from '@hooks';
import { RangeSliderAtom, SelectAtom, SwitchAtom } from '@atoms';
import { useMemo } from 'react';
import styles from './ContentBaseFilter.module.scss';

export const ContentBaseFilter = observer(() => {
  const { contentBaseFiltersStore } = useStoresHook();

  const { isValidForm, fields } = contentBaseFiltersStore?.form;

  const handleChangeStartPeriodTime = (values: number[]) => {
    contentBaseFiltersStore.setFiledForm('periodTime', values);
  };

  const handleChangeScreen = (value: string) => {
    contentBaseFiltersStore.setFiledForm('screen', value);
  };

  const handleChangeType = (value: string) => {
    contentBaseFiltersStore.setFiledForm('typeContent', value);
  };

  const handleChangeStateModeration = (value: string) => {
    contentBaseFiltersStore.setFiledForm('stateModeration', value);
  };

  const handleChangeBroadcastStatus = (value: boolean) => {
    contentBaseFiltersStore.setFiledForm('broadcastStatus', value);
  };

  console.log('fields.broadcastStatus.value = ', fields.broadcastStatus.value);

  return (
    <div className={styles.contentBaseFilter}>
      {useMemo(
        () => (
          <FilterComp onSubmit={contentBaseFiltersStore.submit} onClear={contentBaseFiltersStore.clear}>
            <div className={styles.filterContentContainer}>
              <div className={styles.inputContainer}>
                <SelectAtom
                  label={'Тип контента'}
                  value={fields.typeContent.value}
                  onChange={handleChangeType}
                  options={contentBaseFiltersStore.typeOptionList}
                  isEmpty
                />

                <SelectAtom
                  label={'Состояние модерации'}
                  value={fields.stateModeration.value}
                  onChange={handleChangeStateModeration}
                  options={contentBaseFiltersStore.stateModerationOptionList}
                  isEmpty
                />
              </div>

              <div className={styles.inputContainer}>
                <SelectAtom
                  label={'Разрешение'}
                  value={fields.screen.value}
                  onChange={handleChangeScreen}
                  options={contentBaseFiltersStore.screenOptionList}
                  isEmpty
                />
              </div>

              <div className={styles.sliderContainer}>
                <div>{'Длительность (в секундах): '}</div>

                <RangeSliderAtom
                  values={fields.periodTime.value}
                  maxValue={180}
                  minValue={0}
                  step={10}
                  onChangeValue={handleChangeStartPeriodTime}
                />
              </div>

              <div className={styles.inputContainer}>
                <SwitchAtom
                  label={'Состояние трансляции'}
                  checked={fields.broadcastStatus.value}
                  onChange={handleChangeBroadcastStatus}
                />
              </div>
            </div>
          </FilterComp>
        ),
        [
          fields.periodTime.value,
          fields.screen.value,
          fields.typeContent.value,
          fields.stateModeration.value,
          fields.broadcastStatus.value,
        ],
      )}
    </div>
  );
});

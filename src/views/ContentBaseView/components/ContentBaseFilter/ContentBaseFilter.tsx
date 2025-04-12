import { observer } from 'mobx-react-lite';
import { FilterComp } from '@components';
import { useStoresHook } from '@hooks';
import {
  RangeSliderAtom,
  SelectAtom,
  SwitchAtom,
  MultiSelectChipAtom,
  AutocompleteAtom,
  IAutocompleteAtomOption,
} from '@atoms';
import styles from './ContentBaseFilter.module.scss';

export const ContentBaseFilter = observer(() => {
  const { contentBaseFiltersStore } = useStoresHook();

  const { isValidForm, fields } = contentBaseFiltersStore?.form;

  const handleChangeStartPeriodTime = (values: number[]) => {
    contentBaseFiltersStore.setFiledForm('periodTime', values);
  };

  const handleChangeScreen = (value: any) => {
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

  const handleChangeUser = (option: IAutocompleteAtomOption | null) => {
    contentBaseFiltersStore.setUser(option);
  };

  return (
    <div className={styles.contentBaseFilter}>
      <FilterComp onSubmit={contentBaseFiltersStore.submit} onClear={contentBaseFiltersStore.clear}>
        <div className={styles.filterContentContainer}>
          <div className={styles.inputContainer}>
            <AutocompleteAtom
              label={'Автор последних изменений'}
              options={contentBaseFiltersStore.userList}
              inputValue={contentBaseFiltersStore.usersKeyword}
              onInputValueChange={contentBaseFiltersStore.setUsersKeyword}
              onGetOptions={contentBaseFiltersStore.getOptionsUsers}
              onChange={handleChangeUser}
              value={contentBaseFiltersStore.userSelectedOption}
              clearOnBlur
            />

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
            <MultiSelectChipAtom
              value={fields.screen.value}
              label={'Разрешение'}
              onChange={handleChangeScreen}
              options={contentBaseFiltersStore.screenOptionList}
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
    </div>
  );
});
